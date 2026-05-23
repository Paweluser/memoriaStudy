import { z } from 'zod';

export const transportSchema = z
	.object({
		transport_z: z.string().min(2, { message: 'Podaj miejsce odbioru ciała.' }),
		transport_do: z.string().min(2, { message: 'Podaj miejsce docelowe.' }),
		kierownik_id: z
			.number({
				message: 'Wybierz odpowiedzialnego kierowcę.',
			})
			.min(1, {
				message: 'Wybierz odpowiedzialnego kierowcę.',
			}),

		pracownik_id: z
			.number({
				message: 'Wybierz pomocnika.',
			})
			.min(1, {
				message: 'Wybierz pomocnika.',
			}),
		numer_tel_zleceniodawcy: z.string().regex(/^[0-9\-\+\s]{9,15}$/, {
			message: 'Podaj poprawny numer telefonu (min. 9 cyfr).',
		}),
	})
	.superRefine((data, ctx) => {
		if (data.kierownik_id === data.pracownik_id) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Kierowca i pomocnik muszą być dwiema różnymi osobami.',
				path: ['pracownik_id'],
			});
		}
	});

export type TransportFormValues = z.infer<typeof transportSchema>;
