import joi from "joi";
import { createServerError } from "~~/interface/AppError";

import { BloodGroupI } from "~~/interface/Blood";
import prisma from "~~/server/db";
import { validator } from "~~/server/utils/validator";

const bloodGroupSchema = joi.object<BloodGroupI>({
    name: joi.string().required(),
    pintAvailable: joi.number().required()
});

export default defineEventHandler(async (event) => {
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