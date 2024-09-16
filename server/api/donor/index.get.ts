import { createServerError } from "~~/interface/AppError";
import prisma from "~~/server/db";

export default defineEventHandler(async (event) => {
    if (!event.context.user) throw createServerError(401, "unauthorize");
    const donors = await prisma.donor.findMany({select: {
        id: true,
        name: true,
        sex: true,
        phoneNumber: true,
        email: true,
        createdAt: true,
        bloodGroup: true,
        location: true,
        lastDonated: true
    }});


    return {
        success: true,
        donors
    }
});