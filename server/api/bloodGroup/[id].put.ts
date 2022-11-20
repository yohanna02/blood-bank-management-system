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
    if (!body) throw createServerError(422, "Empty Body");
    const error = validator(bloodGroupSchema, body);
    if (error) {
        throw createServerError(422, "Invalid Params", error);
    }

    const bloodGroupId = event.context.params.id;
    const updatedBloodGroup = await prisma.bloodGroup.update({where: {id: bloodGroupId}, data: {
        name: body.name,
        pintAvailable: body.pintAvailable
    }});


    return {
        success: true,
        bloodGroup: updatedBloodGroup
    };
});