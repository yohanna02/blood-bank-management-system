import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import joi from "joi";

import { createServerError } from "~~/interface/AppError";
import type { AuthI } from "~~/interface/User";
import prisma from "~~/server/db";
import { validator } from "~~/server/utils/validator";

const config = useRuntimeConfig();

const loginSchema = joi.object<AuthI>({
    email: joi.required(),
    password: joi.required()
});

export default defineEventHandler(async (event) => {
    const body = await readBody<AuthI>(event);

    const error = validator(loginSchema, body);
    if (error) {
        throw createServerError(422, "Invalid Params", error);
    }

    const user = await prisma.donor.findUnique({ where: { email: body.email } });
    if (!user) {
        throw createServerError(404, "Email address not registered");
    }

    const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
    if (!isPasswordCorrect) {
        throw createServerError(422, "Password not correct");
    }

    const accessToken = jwt.sign({ id: user.id }, config.jwtScecret2, { expiresIn: "1h" });

    return {
        user: {
            email: user.email
        },
        accessToken
    }
});