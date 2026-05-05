'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@/app/generated/prisma/client';
import {
	DeceasedFormValues,
	ClientFormValues,
	CeremonyFormValues,
} from '@/lib/validations/funeral';

type FuneralTransactionPayload = {
	deceased: DeceasedFormValues;
	client: ClientFormValues;
	ceremony: CeremonyFormValues;
};

function parseTime(timeStr?: string | null) {
	if (!timeStr) return null;
	return new Date(`1970-01-01T${timeStr}:00.000Z`);
}

export async function createFuneralTransaction(
	payload: FuneralTransactionPayload,
) {
	try {
		const { deceased, client, ceremony } = payload;

		const result = await prisma.$transaction(async (tx) => {
			const newDeceased = await tx.zmarly.create({
				data: {
					imie: deceased.imie,
					nazwisko: deceased.nazwisko,
					pesel: deceased.pesel,
					data_urodzenia: new Date(deceased.data_urodzenia),
					data_smierci: new Date(deceased.data_smierci),
					ubezpieczony: deceased.ubezpieczony,
				},
			});

			const newClient = await tx.zleceniodawca.create({
				data: {
					imie: client.imie,
					nazwisko: client.nazwisko,
					telefon: client.telefon,
					ulica: client.ulica || null,
					numer_domu: client.numer_domu || null,
					kod_pocztowy: client.kod_pocztowy || null,
					miejscowosc: client.miejscowosc || null,
					nip: client.nip || null,
					nazwa_firmy: client.nazwa_firmy || null,
				},
			});

			const newCeremony = await tx.ceremonia.create({
				data: {
					zmarly_id: newDeceased.id,
					zleceniodawca_id: newClient.id,
					miejscowosc: ceremony.miejscowosc,
					data_pogrzebu: new Date(ceremony.data_pogrzebu),
					godzina_pogrzebu: parseTime(ceremony.godzina_pogrzebu),
					godzina_wniesienia: parseTime(ceremony.godzina_wniesienia),
					godzina_zbiorki: parseTime(ceremony.godzina_zbiorki),
					rodzaj_pochowku: ceremony.rodzaj_pochowku,
					uwagi: ceremony.uwagi || null,
				},
			});

			return newCeremony;
		});

		revalidatePath('/dashboard/funerals');

		return {
			success: true,
			message: 'Ceremonia została pomyślnie utworzona.',
			ceremonyId: result.id,
		};
	} catch (error: unknown) {
		console.error('Błąd podczas zapisu do bazy:', error);

		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				return {
					success: false,
					message: 'Osoba z takim numerem PESEL już istnieje w bazie danych.',
				};
			}
		}

		return {
			success: false,
			message: 'Wystąpił nieoczekiwany błąd serwera. Spróbuj ponownie.',
		};
	}
}
