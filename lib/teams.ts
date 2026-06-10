import prisma from '@/lib/prisma';

export async function getAllTeams() {
	return await prisma.zespol.findMany({
		orderBy: {
			id: 'asc',
		},
		include: {
			_count: {
				select: { pracownik: true },
			},
		},
	});
}

export async function getTeamById(id: number) {
    return await prisma.zespol.findUnique({
        where: { id },
        include: {
            pracownik: {
                select: {
                    id: true,
                    imie: true,
                    nazwisko: true,
                    rola: true,
                }
            }
        }
    });
}

export async function getAvailableEmployees() {
    return await prisma.pracownik.findMany({
        where: {
            zespol_id: null
        },
        select: {
            id: true,
            imie: true,
            nazwisko: true,
            rola: true,
        },
        orderBy: {
            nazwisko: 'asc'
        }
    });
}