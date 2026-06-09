import { z } from 'zod';

export const teamSchema = z.object({
    nazwa_zespolu: z.string().min(2, { message: 'Nazwa zespołu musi mieć minimum 2 znaki.' }),
});

export type TeamFormValues = z.infer<typeof teamSchema>;