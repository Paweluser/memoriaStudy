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
