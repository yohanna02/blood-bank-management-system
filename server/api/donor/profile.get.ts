import { createServerError } from "~~/interface/AppError";
import prisma from "~~/server/db";
import jwt from "jsonwebtoken";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    const token = event.node.req.headers.authorization?.split(" ")[1];

    if (token) {
        try {
            const decodedToken: any = jwt.verify(token, config.jwtScecret2);

            if (decodedToken) {
                const user = await prisma.donor.findUnique({ where: { id: decodedToken.id } });
                event.context.user = user;
            }
        } catch (err) {
            event.context.user = null;
        }
    }

    if (!event.context.user) throw createServerError(401, "unauthorize");
    const donor = await prisma.donor.findUnique({
        where: { id: event.context.user.id },
        select: {
            id: true,
            name: true,
            sex: true,
            phoneNumber: true,
            email: true,
            lastDonated: true,
            bloodGroup: {
                select: {
                    name: true
                }
            },
            location: true
        }
    });


    return {
        success: true,
        donor
    }
});