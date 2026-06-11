import { z } from 'zod';

export const profileSchema = z.object({
    imie: z.string().min(2, { message: 'Imię musi mieć minimum 2 znaki.' }),
    nazwisko: z.string().min(2, { message: 'Nazwisko musi mieć minimum 2 znaki.' }),
    email: z.string().email({ message: 'Niepoprawny format adresu e-mail.' }),
});

export const passwordSchema = z.object({
    currentPassword: z.string().min(1, { message: 'Obecne hasło jest wymagane.' }),
    newPassword: z.string().min(6, { message: 'Nowe hasło musi mieć min. 6 znaków.' }),
    confirmPassword: z.string().min(1, { message: 'Potwierdź nowe hasło.' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Nowe hasła nie są identyczne!',
    path: ['confirmPassword'],
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type PasswordFormValues = z.infer<typeof passwordSchema>;