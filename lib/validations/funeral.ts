import { getBirthDateFromPesel } from '@/utils/pesel';
import { z } from 'zod';

export const deceasedSchema = z.object({
    firstName: z.string().min(2, { message: 'Imię musi mieć co najmniej 2 znaki.' }),
    lastName: z.string().min(2, { message: 'Nazwisko musi mieć co najmniej 2 znaki.' }),
    pesel: z.string().length(11, { message: 'PESEL musi składać się dokładnie z 11 cyfr.' }).regex(/^\d+$/, { message: 'PESEL może zawierać tylko cyfry.' }),
    birthDate: z.string().min(1, { message: 'Data urodzenia jest wymagana.' }),
    deathDate: z.string().min(1, { message: 'Data śmierci jest wymagana.' }),
    insured: z.boolean(),
}).superRefine((data, ctx) => {
    if (data.pesel && data.pesel.length === 11) {
        const expectedDate = getBirthDateFromPesel(data.pesel);
        if (expectedDate && data.birthDate !== expectedDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Data urodzenia nie zgadza się z numerem PESEL.',
                path: ['birthDate'],
            });
        }
    }
});

export const clientSchema = z.object({
    firstName: z.string().min(2, { message: 'Imię musi mieć co najmniej 2 znaki.' }),
    lastName: z.string().min(2, { message: 'Nazwisko musi mieć co najmniej 2 znaki.' }),
    phone: z.string().regex(/^[0-9\-\+\s]{9,15}$/, { message: 'Podaj poprawny numer telefonu (min. 9 cyfr).' }),
    street: z.string().optional(),
    houseNumber: z.string().optional(),
    zipCode: z.string().regex(/^\d{2}-\d{3}$/, { message: 'Format: XX-XXX' }).optional().or(z.literal('')),
    city: z.string().optional(),
    nip: z.string().optional(),
    companyName: z.string().optional(),
});

export const ceremonySchema = z.object({
    city: z.string().min(2, { message: 'Miejscowość jest wymagana.' }),
    funeralDate: z.string().min(1, { message: 'Data pogrzebu jest wymagana.' }),
    funeralTime: z.string().optional().or(z.literal('')),
    bringingInTime: z.string().optional().or(z.literal('')),
    gatheringTime: z.string().optional().or(z.literal('')),
    burialType: z.enum(['Trumna', 'Urna'], {
        message: 'Wybierz rodzaj pochówku.',
    }),
    notes: z.string().optional(),
});

export type DeceasedFormValues = z.infer<typeof deceasedSchema>;
export type ClientFormValues = z.infer<typeof clientSchema>;
export type CeremonyFormValues = z.infer<typeof ceremonySchema>;