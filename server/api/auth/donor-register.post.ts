import joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { createServerError } from "~~/interface/AppError";
import { validator } from "~~/server/utils/validator";
import prisma from "~~/server/db";
import type { DonorReg } from "~/interface/User";

const config = useRuntimeConfig();

const registerSchema = joi.object<DonorReg>({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    bloodGroupId: joi.string().required(),
    location: joi.string().required(),
    name: joi.string().required(),
    phoneNumber: joi.string().required(),
    sex: joi.string().required()
});

export default defineEventHandler(async (event) => {
    const body = await readBody<DonorReg>(event);

    const error = validator(registerSchema, body);
    if (error) {
        throw createServerError(422, "Invalid Params", error);
    }

    const emailExist = await prisma.donor.findUnique({ where: { email: body.email } });
    if (emailExist) {
        throw createServerError(422, "Email already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const user = await prisma.donor.create({
        data: {
            email: body.email,
            password: hashedPassword,
            location: body.location,
            name: body.name,
            phoneNumber: body.phoneNumber,
            sex: body.sex,
            bloodGroupId: body.bloodGroupId
        }
    });

    const accessToken = jwt.sign({ id: user.id }, config.jwtScecret2, { expiresIn: "1h" });

    return {
        user: {
            email: user.email
        },
        accessToken
    }
});