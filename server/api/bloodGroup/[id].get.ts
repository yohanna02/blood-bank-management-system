import { createServerError } from "~~/interface/AppError";
import prisma from "~~/server/db";

export default defineEventHandler(async (event) => {
    if (!event.context.user) throw createServerError(401, "unauthorize");
    const bloodGroupId = event.context.params.id;
    const bloodGroup = await prisma.bloodGroup.findUnique({ where: {id: bloodGroupId} });

    if (bloodGroup) {
        return {
            success: true,
            bloodGroup
        };
    }

    throw createServerError(404, "Invalid Id");
});