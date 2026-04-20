'use server';

import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

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

	const hashedPassword = await bcrypt.hash(password, 12);

	try {
		await prisma.pracownik.create({
			data: {
				imie: firstName,
				nazwisko: lastName,
				email: email,
				haslo: hashedPassword,
				rola: 'PRZEŁOŻONY',
			},
		});

		return { success: true };
	} catch (error) {
		console.error(error);
		return { errors: { server: 'Błąd podczas zapisu do bazy danych.' } };
	}
}
