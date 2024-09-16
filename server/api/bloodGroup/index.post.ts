import joi from "joi";
import { createServerError } from "~~/interface/AppError";
import jwt from "jsonwebtoken";

const config = useRuntimeConfig();

import type { BloodGroupI } from "~~/interface/Blood";
import prisma from "~~/server/db";
import { validator } from "~~/server/utils/validator";

const bloodGroupSchema = joi.object<BloodGroupI>({
    name: joi.string().required(),
    pintAvailable: joi.number().required()
});

export default defineEventHandler(async (event) => {
    const token = event.node.req.headers.authorization?.split(" ")[1];

    if (token) {
        try {
            const decodedToken: any = jwt.verify(token, config.jwtScecret);

            if (decodedToken) {
                const user = await prisma.user.findUnique({ where: { id: decodedToken.id } });
                event.context.user = user;
            }
        } catch (err) {
            event.context.user = null;
        }
    }
    if (!event.context.user) throw createServerError(401, "unauthorize");

    const body = await readBody<BloodGroupI>(event);

    const error = validator(bloodGroupSchema, body);
    if (error) {
        throw createServerError(422, "Invalid Params", error);
    }

    const bloodGroupExists = await prisma.bloodGroup.findUnique({ where: { name: body.name } });
    if (bloodGroupExists) {
        throw createServerError(422, "Blood group already exist");
    }

    await prisma.bloodGroup.create({ data: { name: body.name, pintAvailable: body.pintAvailable } });

    return {
        success: true,
        message: "Created blood group successfully"
    };
});