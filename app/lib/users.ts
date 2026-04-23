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
