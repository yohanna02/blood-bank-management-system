import prisma from "~~/server/db";

export default defineEventHandler(async (event) => {
    const bloodGroups = await prisma.bloodGroup.findMany();

    return {
        success: true,
        bloodGroups
    }
});