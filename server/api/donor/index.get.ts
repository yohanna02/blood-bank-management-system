import { createServerError } from "~~/interface/AppError";
import prisma from "~~/server/db";

export default defineEventHandler(async (event) => {
    if (!event.context.user) throw createServerError(401, "unauthorize");
    const donors = await prisma.donor.findMany();


    return {
        success: true,
        donors
    }
});