import { createServerError } from "~~/interface/AppError";
import prisma from "~~/server/db";

export default defineEventHandler(async (event) => {
    const bloodGroups = await prisma.bloodGroup.findMany({ orderBy: { updatedAt: "desc" } });

    return {
        success: true,
        bloodGroups
    }
});