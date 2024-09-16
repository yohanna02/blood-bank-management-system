import prisma from "~~/server/db";

export default defineEventHandler(async (event) => {
    const { search } = getQuery(event) as { search: string };
    const donors = await prisma.donor.findMany({
        where: {
            bloodGroup: {
                name: search
            }
        },
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
        },
        orderBy: {
            lastDonated: 'asc'
        }
    });

    return {
        success: true,
        donors
    }
});