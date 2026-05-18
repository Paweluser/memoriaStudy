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