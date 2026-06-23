import { z } from 'zod';

export const transportSchema = z
    .object({
        transportFrom: z.string().min(2, { message: 'Podaj miejsce odbioru ciała.' }),
        transportTo: z.string().min(2, { message: 'Podaj miejsce docelowe.' }),
        managerId: z
            .number({
                message: 'Wybierz odpowiedzialnego kierowcę.',
            })
            .min(1, {
                message: 'Wybierz odpowiedzialnego kierowcę.',
            }),

        employeeId: z
            .number({
                message: 'Wybierz pomocnika.',
            })
            .min(1, {
                message: 'Wybierz pomocnika.',
            }),
        clientPhoneNumber: z.string().regex(/^[0-9\-\+\s]{9,15}$/, {
            message: 'Podaj poprawny numer telefonu (min. 9 cyfr).',
        }),
    })
    .superRefine((data, ctx) => {
        if (data.managerId === data.employeeId) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Kierowca i pomocnik muszą być dwiema różnymi osobami.',
                path: ['employeeId'],
            });
        }
    });

export type TransportFormValues = z.infer<typeof transportSchema>;
