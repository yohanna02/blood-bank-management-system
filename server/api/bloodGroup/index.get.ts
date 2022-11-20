import { createServerError } from "~~/interface/AppError";
import prisma from "~~/server/db";

export default defineEventHandler(async (event) => {
    if (!event.context.user) throw createServerError(401, "unauthorize");
    const bloodGroups = await prisma.bloodGroup.findMany({ orderBy: { updatedAt: "desc" } });

    return {
        success: true,
        bloodGroups
    }
});