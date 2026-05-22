import { getBirthDateFromPesel } from '@/utils/pesel';
import { z } from 'zod';

export const deceasedSchema = z.object({
    imie: z.string().min(2, { message: 'Imię musi mieć co najmniej 2 znaki.' }),
    nazwisko: z.string().min(2, { message: 'Nazwisko musi mieć co najmniej 2 znaki.' }),
    pesel: z.string().length(11, { message: 'PESEL musi składać się dokładnie z 11 cyfr.' }).regex(/^\d+$/, { message: 'PESEL może zawierać tylko cyfry.' }),
    data_urodzenia: z.string().min(1, { message: 'Data urodzenia jest wymagana.' }),
    data_smierci: z.string().min(1, { message: 'Data śmierci jest wymagana.' }),
    ubezpieczony: z.boolean(),
}).superRefine((data, ctx) => {
    if (data.pesel && data.pesel.length === 11) {
        const expectedDate = getBirthDateFromPesel(data.pesel);
        if (expectedDate && data.data_urodzenia !== expectedDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Data urodzenia nie zgadza się z numerem PESEL.',
                path: ['data_urodzenia'],
            });
        }
    }
});

export const clientSchema = z.object({
    imie: z.string().min(2, { message: 'Imię musi mieć co najmniej 2 znaki.' }),
    nazwisko: z.string().min(2, { message: 'Nazwisko musi mieć co najmniej 2 znaki.' }),
    telefon: z.string().regex(/^[0-9\-\+\s]{9,15}$/, { message: 'Podaj poprawny numer telefonu (min. 9 cyfr).' }),
    ulica: z.string().optional(),
    numer_domu: z.string().optional(),
    kod_pocztowy: z.string().regex(/^\d{2}-\d{3}$/, { message: 'Format: XX-XXX' }).optional().or(z.literal('')),
    miejscowosc: z.string().optional(),
    nip: z.string().optional(),
    nazwa_firmy: z.string().optional(),
});

export const ceremonySchema = z.object({
    miejscowosc: z.string().min(2, { message: 'Miejscowość jest wymagana.' }),
    data_pogrzebu: z.string().min(1, { message: 'Data pogrzebu jest wymagana.' }),
    godzina_pogrzebu: z.string().optional().or(z.literal('')),
    godzina_wniesienia: z.string().optional().or(z.literal('')),
    godzina_zbiorki: z.string().optional().or(z.literal('')),
    rodzaj_pochowku: z.enum(['Trumna', 'Urna'], {
    message: 'Wybierz rodzaj pochówku.',
}),
    uwagi: z.string().optional(),
});

export type DeceasedFormValues = z.infer<typeof deceasedSchema>;
export type ClientFormValues = z.infer<typeof clientSchema>;
export type CeremonyFormValues = z.infer<typeof ceremonySchema>;