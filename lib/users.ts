import prisma from './prisma';

export async function createUser(
	firstName: string,
	lastName: string,
	email: string,
	haslo: string,
) {
	return await prisma.pracownik.create({
		data: {
			imie: firstName,
			nazwisko: lastName,
			email: email,
			haslo: haslo,
			rola: 'PRACOWNIK',
		},
	});
}

export async function getUserByEmail(email: string) {
	return await prisma.pracownik.findUnique({
		where: { email: email },
	});
}

export async function getEmployees() {
  return await prisma.pracownik.findMany({
    include: {
      zespol: true, 
    },
    orderBy: {
      nazwisko: 'asc', 
    },
  });
}

export async function getOperationalEmployees() {
    return await prisma.pracownik.findMany({
        where: {
            rola: 'PRACOWNIK',
        },
        select: {
            id: true,
            imie: true,
            nazwisko: true,
        },
        orderBy: {
            nazwisko: 'asc',
        }
    });
}