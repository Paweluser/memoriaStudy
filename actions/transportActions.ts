'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { TransportFormValues } from '@/lib/validations/transport';

export async function createTransport(data: TransportFormValues) {
	try {
		const newTransport = await prisma.zlecenie_przewozu.create({
			data: {
				transport_z: data.transport_z,
				transport_do: data.transport_do,
				kierownik_id: data.kierownik_id,
				pracownik_id: data.pracownik_id,
				numer_tel_zleceniodawcy: data.numer_tel_zleceniodawcy,
			},
		});
		revalidatePath('/dashboard/funerals/history');
		return {
			success: true,
			message: 'Zlecenie przewozu zostało pomyślnie dodane.',
			transportId: newTransport.id,
		};
	} catch (error: unknown) {
		console.error('Błąd podczas zapisywania przewozu do bazy:', error);
		return {
			success: false,
			message: 'Wystąpił błąd podczas zapisywania zlecenia. Spróbuj ponownie.',
		};
	}
}
