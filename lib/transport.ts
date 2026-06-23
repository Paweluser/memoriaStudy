import prisma from '@/lib/prisma'; 

export async function getAllTransports() {
    return await prisma.transportOrder.findMany({ 
        orderBy: {
            id: 'desc',
        },
        include: {
            manager: true,  
            assistant: true, 
        },
    });
}