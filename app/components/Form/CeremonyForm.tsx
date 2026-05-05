'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ceremonySchema, CeremonyFormValues } from '@/lib/validations/funeral';

type Step3Props = {
	onNext: (data: CeremonyFormValues) => void;
	onBack: () => void;
};

export default function CeremonyForm({ onNext, onBack }: Step3Props) {
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
			className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
			<h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
				Krok 3: Szczegóły Ceremonii
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Miejscowość ceremonii *
					</label>
					<input
						{...register('miejscowosc')}
						className="w-full border rounded-md p-2 focus:ring-(--main-color) focus:border-(--main-color)"
						placeholder="np. Warszawa"
					/>
					{errors.miejscowosc && (
						<p className="text-red-500 text-sm mt-1">
							{errors.miejscowosc.message}
						</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Data pogrzebu *
					</label>
					<input
						type="date"
						{...register('data_pogrzebu')}
						className="w-full border rounded-md p-2 focus:ring-(--main-color) focus:border-(--main-color)"
					/>
					{errors.data_pogrzebu && (
						<p className="text-red-500 text-sm mt-1">
							{errors.data_pogrzebu.message}
						</p>
					)}
				</div>

				<div className="md:col-span-2 pt-4 border-t mt-2">
					<h3 className="text-md font-medium text-gray-800 mb-3">
						Harmonogram czasowy
					</h3>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Godzina zbiórki
					</label>
					<input
						type="time"
						{...register('godzina_zbiorki')}
						className="w-full border rounded-md p-2 focus:ring-(--main-color) focus:border-(--main-color)"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Godzina wniesienia
					</label>
					<input
						type="time"
						{...register('godzina_wniesienia')}
						className="w-full border rounded-md p-2 focus:ring-(--main-color) focus:border-(--main-color)"
					/>
				</div>

				<div className="md:col-span-2">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Godzina mszy / ceremonii
					</label>
					<input
						type="time"
						{...register('godzina_pogrzebu')}
						className="w-full border rounded-md p-2 focus:ring-(--main-color) focus:border-(--main-color)"
					/>
				</div>
				<div className="md:col-span-2 pt-4 border-t mt-2">
					<h3 className="text-md font-medium text-gray-800 mb-3">
						Szczegóły pochówku
					</h3>
				</div>

				<div className="md:col-span-2">
					<label className="block text-sm font-medium text-gray-700 mb-2">
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
						<p className="text-red-500 text-sm mt-1">
							{errors.rodzaj_pochowku.message}
						</p>
					)}
				</div>

				<div className="md:col-span-2">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Uwagi dodatkowe
					</label>
					<textarea
						{...register('uwagi')}
						rows={3}
						className="w-full border rounded-md p-2 focus:ring-(--main-color) focus:border-(--main-color)"
						placeholder="Np. oprawa muzyczna, wieniec od firmy..."
					/>
				</div>
			</div>

			<div className="flex justify-between pt-6 mt-4 border-t">
				<button
					type="button"
					onClick={onBack}
					className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
					Wstecz
				</button>
				<button
					type="submit"
					className="bg-black text-white px-6 py-2 rounded-md">
					Zakończ i Podsumuj
				</button>
			</div>
		</form>
	);
}
