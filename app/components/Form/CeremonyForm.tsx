'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ceremonySchema, CeremonyFormValues } from '@/lib/validations/funeral';
import InputForm from './InputForm';
import AppButton from '../Dashboard/AppButton';

type CeremonyFormProps = {
	onNext: (data: CeremonyFormValues) => void;
	onBack: () => void;
};

export default function CeremonyForm({ onNext, onBack }: CeremonyFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CeremonyFormValues>({
		resolver: zodResolver(ceremonySchema),
	});

	const onSubmit: SubmitHandler<CeremonyFormValues> = (data) => {
		onNext(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-6 p-6 rounded-lg shadow-sm border">
			<h2 className="text-xl font-semibold border-b pb-2">
				Krok 3: Szczegóły Ceremonii
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<InputForm
					label="Miejscowość ceremonii *"
					name="miejscowosc"
					register={register}
					error={errors.miejscowosc}
					placeholder="np. Warszawa"
				/>

				<InputForm
					label="Data pogrzebu *"
					name="data_pogrzebu"
					type="date"
					register={register}
					error={errors.data_pogrzebu}
				/>

				<div className="md:col-span-2 pt-4 border-t mt-2">
					<h3 className="text-md font-medium mb-3">Harmonogram czasowy</h3>
				</div>

				<InputForm
					label="Godzina zbiórki"
					name="godzina_zbiorki"
					type="time"
					register={register}
					error={errors.godzina_zbiorki}
				/>
				<InputForm
					label="Godzina wniesienia"
					name="godzina_wniesienia"
					type="time"
					register={register}
					error={errors.godzina_wniesienia}
				/>
				<InputForm
					label="Godzina mszy / ceremonii"
					name="godzina_pogrzebu"
					type="time"
					register={register}
					error={errors.godzina_pogrzebu}
					className="md:col-span-2"
				/>

				<div className="md:col-span-2 pt-4 border-t mt-2">
					<h3 className="text-md font-medium mb-3">Szczegóły pochówku</h3>
				</div>
				<div className="md:col-span-2">
					<label className="block text-sm font-medium mb-2">
						Rodzaj pochówku *
					</label>
					<div className="flex gap-6">
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="radio"
								value="Trumna"
								{...register('rodzaj_pochowku')}
								className="w-4 h-4 text-(--main-color)"
							/>
							Tradycyjny (Trumna)
						</label>
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="radio"
								value="Urna"
								{...register('rodzaj_pochowku')}
								className="w-4 h-4 text-(--main-color)"
							/>
							Kremacja (Urna)
						</label>
					</div>
					{errors.rodzaj_pochowku && (
						<p className="text-(--error-color) text-sm mt-1">
							{errors.rodzaj_pochowku.message}
						</p>
					)}
				</div>
				<div className="md:col-span-2">
					<label className="block text-sm font-medium mb-1">
						Uwagi dodatkowe
					</label>
					<textarea
						{...register('uwagi')}
						rows={3}
						className="w-full border rounded-md p-2"
						placeholder="Np. oprawa muzyczna, wieniec od firmy..."
					/>
				</div>
			</div>

			<div className="flex justify-between pt-6 mt-4 border-t">
				<AppButton type="button" onClick={onBack}>
					Wstecz
				</AppButton>
				<AppButton type="submit">Zakończ i Podsumuj</AppButton>
			</div>
		</form>
	);
}
