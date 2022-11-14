import joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { createServerError } from "~~/interface/AppError";
import { validator } from "~~/server/utils/validator";
import prisma from "~~/server/db";
import { AuthI } from "~~/interface/User";

const config = useRuntimeConfig();

const registerSchema = joi.object<AuthI>({
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
});

export default defineEventHandler(async (event) => {
    const body = await readBody<AuthI>(event);

    const error = validator(registerSchema, body);
    if (error) {
        throw createServerError(422, "Invalid Params", error);
    }

    const emailExist = await prisma.user.findUnique({ where: { email: body.email } });
    if (emailExist) {
        throw createServerError(422, "Email already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const user = await prisma.user.create({
        data: {
            email: body.email,
            password: hashedPassword
        }
    });

    const accessToken = jwt.sign({ id: user.id }, config.jwtScecret, { expiresIn: "1h" });

    return {
        user: {
            email: user.email
        },
        accessToken
    }
});