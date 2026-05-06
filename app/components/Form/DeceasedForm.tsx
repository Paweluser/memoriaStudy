'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deceasedSchema, DeceasedFormValues } from '@/lib/validations/funeral';
import InputForm from './InputForm';
import AppButton from '../AppButton';

type DeceasedFormProps = {
	onNext: (data: DeceasedFormValues) => void;
};

export default function DeceasedForm({ onNext }: DeceasedFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<DeceasedFormValues>({
		resolver: zodResolver(deceasedSchema),
		defaultValues: {
			ubezpieczony: false,
		},
	});

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
					name="imie"
					register={register}
					error={errors.imie}
					placeholder="Jan"
				/>

				<InputForm
					label="Nazwisko"
					name="nazwisko"
					register={register}
					error={errors.nazwisko}
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
					name="data_urodzenia"
					type="date"
					register={register}
					error={errors.data_urodzenia}
				/>

				<InputForm
					label="Data śmierci"
					name="data_smierci"
					type="date"
					register={register}
					error={errors.data_smierci}
				/>
				<div className="md:col-span-2 flex items-center gap-2 mt-2">
					<input
						type="checkbox"
						{...register('ubezpieczony')}
						className="w-4 h-4 text-(--main-color) rounded"
						id="ubezpieczony"
					/>
					<label
						htmlFor="ubezpieczony"
						className="text-sm font-medium">
						Osoba ubezpieczona
					</label>
				</div>
			</div>
			<div className="flex justify-end pt-4">
				<AppButton type="submit">
                    Dalej
                </AppButton>
			</div>
		</form>
	);
}
