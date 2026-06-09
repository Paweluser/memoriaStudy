'use server';

import prisma from '@/lib/prisma';
import { teamSchema, TeamFormValues } from '@/lib/validations/teams';
import { revalidatePath } from 'next/cache';

export async function createTeam(data: TeamFormValues) {
	const parsed = teamSchema.safeParse(data);

	if (!parsed.success) {
		return { success: false, message: 'Nieprawidłowe dane formularza.' };
	}

	try {
		await prisma.zespol.create({
			data: {
				nazwa_zespolu: parsed.data.nazwa_zespolu,
			},
		});

		revalidatePath('/dashboard/teams');

		return { success: true, message: 'Zespół został pomyślnie dodany.' };
	} catch (error) {
		console.error('Błąd podczas tworzenia zespołu:', error);
		return { success: false, message: 'Wystąpił błąd bazy danych.' };
	}
}
