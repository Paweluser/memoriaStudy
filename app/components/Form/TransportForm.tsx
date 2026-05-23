'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    transportSchema,
    TransportFormValues,
} from '@/lib/validations/transport';
import InputForm from './InputForm';
import AppButton from '../Dashboard/AppButton';

type Employee = {
    id: number;
    imie: string;
    nazwisko: string;
};

type TransportFormProps = {
    employees: Employee[];
};

export default function TransportForm({ employees }: TransportFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TransportFormValues>({
        resolver: zodResolver(transportSchema),
    });

    const onSubmit: SubmitHandler<TransportFormValues> = async (data) => {
        console.log('Dane do wysłania:', data);
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
                            name="transport_z"
                            register={register}
                            error={errors.transport_z}
                            placeholder="np. Szpital Bródnowski"
                        />
                    </div>
                    <div className="flex-1 w-full">
                        <InputForm
                            label="Transport docelowy"
                            name="transport_do"
                            register={register}
                            error={errors.transport_do}
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
                            {...register('kierownik_id', { valueAsNumber: true })}
                            className="border rounded p-2 bg-white">
                            <option value="">Wybierz pracownika</option>
                            {employees.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.imie} {emp.nazwisko}
                                </option>
                            ))}
                        </select>
                        {errors.kierownik_id && (
                            <span className="text-(--error-color) text-sm mt-1">
                                {errors.kierownik_id.message}
                            </span>
                        )}
                    </div>

                    <div className="flex-1 w-full flex flex-col">
                        <label className="mb-1 text-sm font-medium">Pomocnik</label>
                        <select
                            {...register('pracownik_id', { valueAsNumber: true })}
                            className="border rounded p-2 bg-white">
                            <option value="">Wybierz pracownika</option>
                            {employees.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.imie} {emp.nazwisko}
                                </option>
                            ))}
                        </select>
                        {errors.pracownik_id && (
                            <span className="text-(--error-color) text-sm mt-1">
                                {errors.pracownik_id.message}
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
                            name="numer_tel_zleceniodawcy"
                            register={register}
                            error={errors.numer_tel_zleceniodawcy}
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
