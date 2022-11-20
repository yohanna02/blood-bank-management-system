import joi from "joi";
import { createServerError } from "~~/interface/AppError";

import { DonorI } from "~~/interface/Blood";
import prisma from "~~/server/db";
import { validator } from "~~/server/utils/validator";

const donorSchema = joi.object<DonorI>({
    name: joi.string().required(),
    bloodGroupId: joi.string().required(),
    sex: joi.string().allow("MALE", "FEMALE").required(),
    email: joi.string().email().required(),
    phoneNumber: joi.string().required()
});

export default defineEventHandler(async (event) => {
    if (!event.context.user) throw createServerError(401, "unauthorize");
    const body = await readBody<DonorI>(event);

    const error = validator(donorSchema, body);
    if (error) {
        throw createServerError(422, "Invalid Params", error);
    }

    const bloodGroupExist = await prisma.bloodGroup.findUnique({ where: { id: body.bloodGroupId } });
    if (!bloodGroupExist) {
        throw createServerError(404, "Invalid Blood group");
    }

    await prisma.donor.create({
        data: {
            name: body.name,
            bloodGroupId: body.bloodGroupId,
            sex: body.sex,
            email: body.email,
            phoneNumber: body.phoneNumber
        }
    });

    await prisma.bloodGroup.update({ where: { id: body.bloodGroupId }, data: { pintAvailable: ++bloodGroupExist.pintAvailable } });

    return {
        success: true,
        message: "Add donor successfully"
    };
});