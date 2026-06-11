'use server';

import prisma from '@/lib/prisma';
import { profileSchema, ProfileFormValues } from '@/lib/validations/settings';
import { revalidatePath } from 'next/cache';

export async function updateProfile(userId: number, data: ProfileFormValues) {
    const parsed = profileSchema.safeParse(data);

    if (!parsed.success) {
        return { success: false, message: 'Nieprawidłowe dane formularza.' };
    }

    try {
        const existingEmail = await prisma.pracownik.findFirst({
            where: {
                email: parsed.data.email,
                NOT: { id: userId } 
            }
        });

        if (existingEmail) {
            return { success: false, message: 'Ten adres e-mail jest już zajęty przez inne konto.' };
        }

        await prisma.pracownik.update({
            where: { id: userId },
            data: {
                imie: parsed.data.imie,
                nazwisko: parsed.data.nazwisko,
                email: parsed.data.email,
            },
        });

        revalidatePath('/dashboard/settings');

        return { success: true, message: 'Twoje dane zostały pomyślnie zaktualizowane.' };
        
    } catch (error) {
        console.error('Błąd aktualizacji profilu:', error);
        return { success: false, message: 'Wystąpił błąd podczas zapisywania danych.' };
    }
}