'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema, ClientFormValues } from '@/lib/validations/funeral';
import InputForm from './InputForm';
import AppButton from '../Dashboard/AppButton';

type ClientFormProps = {
    onNext: (data: ClientFormValues) => void;
    onBack: () => void;
};

export default function ClientForm({ onNext, onBack }: ClientFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ClientFormValues>({
        resolver: zodResolver(clientSchema),
    });

    const onSubmit: SubmitHandler<ClientFormValues> = (data) => {
        onNext(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold border-b pb-2">
                Krok 2: Dane Zleceniodawcy
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputForm
                    label="Imię *"
                    name="firstName"
                    register={register}
                    error={errors.firstName}
                    placeholder="Jan"
                />

                <InputForm
                    label="Nazwisko *"
                    name="lastName"
                    register={register}
                    error={errors.lastName}
                    placeholder="Kowalski"
                />

                <InputForm
                    label="Telefon kontaktowy *"
                    name="phone"
                    register={register}
                    error={errors.phone}
                    placeholder="+48 123 456 789"
                    className="md:col-span-2"
                />

                <div className="md:col-span-2 pt-4 border-t mt-2">
                    <h3 className="text-md font-medium mb-3">
                        Adres zamieszkania (opcjonalnie)
                    </h3>
                </div>

                <InputForm
                    label="Ulica"
                    name="street"
                    register={register}
                    error={errors.street}
                />
                <InputForm
                    label="Nr domu / lokalu"
                    name="houseNumber"
                    register={register}
                    error={errors.houseNumber}
                />
                <InputForm
                    label="Kod pocztowy"
                    name="zipCode"
                    register={register}
                    error={errors.zipCode}
                    placeholder="XX-XXX"
                />
                <InputForm
                    label="Miejscowość"
                    name="city"
                    register={register}
                    error={errors.city}
                />

                <div className="md:col-span-2 pt-4 border-t mt-2">
                    <h3 className="text-md font-medium text-gray-800 mb-3">
                        Dane do faktury / Firma (opcjonalnie)
                    </h3>
                </div>

                <InputForm
                    label="NIP"
                    name="nip"
                    register={register}
                    error={errors.nip}
                />
                <InputForm
                    label="Nazwa firmy"
                    name="companyName"
                    register={register}
                    error={errors.companyName}
                />
            </div>

            <div className="flex justify-between pt-6 mt-4 border-t">
                <AppButton type="button" onClick={onBack} className="shrink-0">
                    Wstecz
                </AppButton>
                <AppButton type="submit" className="shrink-0">
                    Dalej
                </AppButton>
            </div>
        </form>
    );
}