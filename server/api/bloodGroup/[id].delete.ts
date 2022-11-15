import { createServerError } from "~~/interface/AppError";
import prisma from "~~/server/db";

export default defineEventHandler(async (event) => {
    const bloodGroupId = event.context.params.id;
    if (!bloodGroupId) {
        throw createServerError(422, "Invalid params");
    }

    await prisma.bloodGroup.delete({ where: { id: bloodGroupId } });

    return {
        success: true,
        message: "Blood group deleted successfully"
    };
});