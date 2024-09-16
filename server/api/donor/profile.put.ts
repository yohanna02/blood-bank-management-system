import jwt from "jsonwebtoken";
import { createServerError } from "~/interface/AppError";
import prisma from "~/server/db";

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
    
    const body = await readBody<{
        name: string;
        email: string;
        phoneNumber: string;
        location: string;
        lastDonated: string;
    }>(event);

    const donor = await prisma.donor.update({
        where: { id: event.context.user.id },
        data: {
            name: body.name,
            email: body.email,
            phoneNumber: body.phoneNumber,
            location: body.location,
            lastDonated: new Date(body.lastDonated)
        }
    });

    return {
        success: true,
        message: "Profile updated successfully",
    }
});