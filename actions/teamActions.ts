'use server';

import prisma from '@/lib/prisma';
import { teamSchema, TeamFormValues } from '@/lib/validations/teams';
import { revalidatePath } from 'next/cache';

export async function createTeam(data: TeamFormValues) {
    const parsed = teamSchema.safeParse(data);

    if (!parsed.success) {
        return { success: false, message: 'Nieprawidłowe dane formularza.' };
    }

    try {
        await prisma.team.create({
            data: {
                teamName: parsed.data.teamName, 
            },
        });

        revalidatePath('/dashboard/teams');

        return { success: true, message: 'Zespół został pomyślnie dodany.' };
    } catch (error) {
        console.error('Błąd podczas tworzenia zespołu:', error);
        return { success: false, message: 'Wystąpił błąd bazy danych.' };
    }
}

export async function assignEmployeeToTeam(employeeId: number, teamId: number | null) {
    try {
        await prisma.employee.update({
            where: { id: employeeId },
            data: { teamId: teamId } 
        });

        revalidatePath(`/dashboard/teams/${teamId}`);
        revalidatePath('/dashboard/teams');
        revalidatePath('/dashboard/employees');

        return { success: true, message: 'Zaktualizowano przypisanie pracownika.' };
    } catch (error) {
        console.error('Błąd przypisywania pracownika:', error);
        return { success: false, message: 'Nie udało się zaktualizować pracownika.' };
    }
}