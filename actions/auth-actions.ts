'use server';
import { hashUserPassword } from '@/app/lib/hash';
import { createUser } from '@/app/lib/users';
import { Prisma } from '@/app/generated/prisma/client';

export async function register(prevState, formData) {
	const firstName = formData.get('firstName');
	const lastName = formData.get('lastName');
	const email = formData.get('email');
	const password = formData.get('password');

	const errors = {};

	if (!firstName || firstName.trim() === '') {
		errors.firstName = 'Imię jest wymagane.';
	}
	if (!lastName || lastName.trim() === '') {
		errors.lastName = 'Nazwisko jest wymagane.';
	}

	if (!email.includes('@')) {
		errors.email = 'Proszę wpisać poprawny adres e-mail.';
	}

	if (password.trim().length < 6) {
		errors.password = 'Hasło musi mieć co najmniej 6 znaków.';
	}

	if (Object.keys(errors).length > 0) {
		return { errors };
	}

	const hashedPassword = hashUserPassword(password);

	try {
		await await createUser(firstName, lastName, email, hashedPassword);
		return { success: true };
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				return {
					errors: {
						email:
							'Konto z tym adresem e-mail już istnieje w systemie Memoria.',
					},
				};
			}
		}
		console.error(error);
		return { errors: { server: 'Błąd podczas zapisu do bazy danych.' } };
	}
}
