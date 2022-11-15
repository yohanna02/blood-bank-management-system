import prisma from "~~/server/db";

export default defineEventHandler(async (event) => {
    const donors = await prisma.donor.findMany();


    return {
        success: true,
        donors
    }
});