import { z } from 'zod';

export const teamSchema = z.object({
    teamName: z.string().min(2, { message: 'Nazwa zespołu musi mieć minimum 2 znaki.' }),
});

export type TeamFormValues = z.infer<typeof teamSchema>;