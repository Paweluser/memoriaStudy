import prisma from '@/lib/prisma'; 

export async function getAllTransports() {
    return await prisma.zlecenie_przewozu.findMany({
        orderBy: {
            id: 'desc',
        },
        include: {
            pracownik_zlecenie_przewozu_kierownik_idTopracownik: true,
            pracownik_zlecenie_przewozu_pracownik_idTopracownik: true,
        },
    });
}