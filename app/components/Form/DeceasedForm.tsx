'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { deceasedSchema, DeceasedFormValues } from '@/lib/validations/funeral';
import { getBirthDateFromPesel } from '@/utils/pesel';
import InputForm from './InputForm';
import AppButton from '../Dashboard/AppButton';

type DeceasedFormProps = {
    onNext: (data: DeceasedFormValues) => void;
};

export default function DeceasedForm({ onNext }: DeceasedFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        control, 
        formState: { errors },
    } = useForm<DeceasedFormValues>({
        resolver: zodResolver(deceasedSchema),
        defaultValues: {
            insured: false,
        },
    });

    const peselValue = useWatch({
        control,
        name: 'pesel',
    });

    useEffect(() => {
        if (peselValue && peselValue.length === 11) {
            const birthDate = getBirthDateFromPesel(peselValue);
            if (birthDate) {
                setValue('birthDate', birthDate, {
                    shouldValidate: true,
                    shouldDirty: true,
                });
            }
        }
    }, [peselValue, setValue]);

    const handleFormSubmit: SubmitHandler<DeceasedFormValues> = (data) => {
        onNext(data);
    };

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-6 p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold border-b pb-2">
                Krok 1: Dane osoby zmarłej
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputForm
                    label="Imię"
                    name="firstName"
                    register={register}
                    error={errors.firstName}
                    placeholder="Jan"
                />
                <InputForm
                    label="Nazwisko"
                    name="lastName"
                    register={register}
                    error={errors.lastName}
                    placeholder="Kowalski"
                />
                <InputForm
                    label="PESEL"
                    name="pesel"
                    register={register}
                    error={errors.pesel}
                    placeholder="00000000000"
                    className="md:col-span-2"
                />
                <InputForm
                    label="Data urodzenia"
                    name="birthDate"
                    type="date"
                    register={register}
                    error={errors.birthDate}
                />
                <InputForm
                    label="Data śmierci"
                    name="deathDate"
                    type="date"
                    register={register}
                    error={errors.deathDate}
                />
                <div className="md:col-span-2 flex items-center gap-2 mt-2">
                    <input
                        type="checkbox"
                        {...register('insured')}
                        className="w-4 h-4 text-(--main-color) rounded"
                        id="insured"
                    />
                    <label htmlFor="insured" className="text-sm font-medium">
                        Osoba ubezpieczona
                    </label>
                </div>
            </div>
            <div className="flex justify-end pt-4">
                <AppButton type="submit">Dalej</AppButton>
            </div>
        </form>
    );
}