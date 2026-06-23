'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { TransportFormValues } from '@/lib/validations/transport';

export async function createTransport(data: TransportFormValues) {
    try {
        const newTransport = await prisma.transportOrder.create({
            data: {
                transportFrom: data.transportFrom,
                transportTo: data.transportTo,
                managerId: data.managerId,
                employeeId: data.employeeId,
                clientPhoneNumber: data.clientPhoneNumber,
            },
        });
        
        revalidatePath('/dashboard/funerals/history');
        
        return {
            success: true,
            message: 'Zlecenie przewozu zostało pomyślnie dodany.',
            transportId: newTransport.id,
        };
    } catch (error: unknown) {
        console.error('Błąd podczas zapisywania przewozu do bazy:', error);
        return {
            success: false,
            message: 'Wystąpił błąd podczas zapisywania zlecenia. Spróbuj ponownie.',
        };
    }
}
