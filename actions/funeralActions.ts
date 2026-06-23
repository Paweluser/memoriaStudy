'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@/app/generated/prisma'; 
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
            const newDeceased = await tx.deceased.create({
                data: {
                    firstName: deceased.firstName,
                    lastName: deceased.lastName,
                    pesel: deceased.pesel,
                    birthDate: new Date(deceased.birthDate),
                    deathDate: new Date(deceased.deathDate),
                    insured: deceased.insured,
                },
            });

            const newClient = await tx.client.create({
                data: {
                    firstName: client.firstName,
                    lastName: client.lastName,
                    phone: client.phone,
                    street: client.street || null,
                    houseNumber: client.houseNumber || null,
                    zipCode: client.zipCode || null,
                    city: client.city || null,
                    nip: client.nip || null,
                    companyName: client.companyName || null,
                },
            });

            const newCeremony = await tx.ceremony.create({
                data: {
                    deceasedId: newDeceased.id, 
                    clientId: newClient.id,     
                    city: ceremony.city,        
                    funeralDate: new Date(ceremony.funeralDate),
                    funeralTime: parseTime(ceremony.funeralTime),
                    bringingInTime: parseTime(ceremony.bringingInTime),
                    gatheringTime: parseTime(ceremony.gatheringTime),
                    burialType: ceremony.burialType,
                    notes: ceremony.notes || null,
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
