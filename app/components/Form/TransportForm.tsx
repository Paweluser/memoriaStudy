'use client';

import { createTransport } from '@/actions/transportActions';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    transportSchema,
    TransportFormValues,
} from '@/lib/validations/transport';
import InputForm from './InputForm';
import AppButton from '../Dashboard/AppButton';
import { useRouter } from 'next/navigation';

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
};

type TransportFormProps = {
    employees: Employee[];
};

export default function TransportForm({ employees }: TransportFormProps) {
    const router = useRouter(); 

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TransportFormValues>({
        resolver: zodResolver(transportSchema),
    });

    const onSubmit: SubmitHandler<TransportFormValues> = async (data) => {
        try {
            const result = await createTransport(data);

            if (result.success) {
                alert(result.message);
                router.push('/dashboard/funerals/history'); 
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Błąd sieci/klienta:', error);
            alert('Wystąpił problem z połączeniem.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 p-6 rounded-lg shadow-sm border">
            
            <section>
                <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                    Trasa przewozu
                </h2>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="flex-1 w-full">
                        <InputForm
                            label="Odbiór"
                            name="transportFrom"
                            register={register}
                            error={errors.transportFrom}
                            placeholder="np. Szpital Bródnowski"
                        />
                    </div>
                    <div className="flex-1 w-full">
                        <InputForm
                            label="Transport docelowy"
                            name="transportTo"
                            register={register}
                            error={errors.transportTo}
                            placeholder="np. Chłodnia główna"
                        />
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                    Obsługa zlecenia
                </h2>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="flex-1 w-full flex flex-col">
                        <label className="mb-1 text-sm font-medium">Kierowca</label>
                        <select
                            {...register('managerId', { valueAsNumber: true })}
                            className="border rounded p-2 bg-white">
                            <option value="">Wybierz pracownika</option>
                            {employees.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.firstName} {emp.lastName}
                                </option>
                            ))}
                        </select>
                        {errors.managerId && (
                            <span className="text-(--error-color) text-sm mt-1">
                                {errors.managerId.message}
                            </span>
                        )}
                    </div>

                    <div className="flex-1 w-full flex flex-col">
                        <label className="mb-1 text-sm font-medium">Pomocnik</label>
                        <select
                            {...register('employeeId', { valueAsNumber: true })}
                            className="border rounded p-2 bg-white">
                            <option value="">Wybierz pracownika</option>
                            {employees.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.firstName} {emp.lastName}
                                </option>
                            ))}
                        </select>
                        {errors.employeeId && (
                            <span className="text-(--error-color) text-sm mt-1">
                                {errors.employeeId.message}
                            </span>
                        )}
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                    Kontakt na miejscu
                </h2>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="w-full md:w-[calc(50%-0.5rem)]">
                        <InputForm
                            label="Numer telefonu zleceniodawcy"
                            name="clientPhoneNumber"
                            register={register}
                            error={errors.clientPhoneNumber}
                            placeholder="+48 000 000 000"
                        />
                    </div>
                </div>
            </section>

            <div className="flex justify-end pt-4">
                <AppButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Zapisywanie...' : 'Dodaj zlecenie przewozu'}
                </AppButton>
            </div>
        </form>
    );
}