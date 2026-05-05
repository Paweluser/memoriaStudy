'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema, ClientFormValues } from '@/lib/validations/funeral';

type Step2Props = {
	onNext: (data: ClientFormValues) => void;
	onBack: () => void;
};

export default function ClientForm({ onNext, onBack }: Step2Props) {
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
			className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
			<h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
				Krok 2: Dane Zleceniodawcy
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Imię *
					</label>
					<input
						{...register('imie')}
						className="w-full border rounded-md p-2 focus:ring-(--main-color) focus:border-(--main-color)"
						placeholder="Jan"
					/>
					{errors.imie && (
						<p className="text-red-500 text-sm mt-1">{errors.imie.message}</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Nazwisko *
					</label>
					<input
						{...register('nazwisko')}
						className="w-full border rounded-md p-2 focus:ring-(--main-color) focus:border-(--main-color)"
						placeholder="Kowalski"
					/>
					{errors.nazwisko && (
						<p className="text-red-500 text-sm mt-1">
							{errors.nazwisko.message}
						</p>
					)}
				</div>

				<div className="md:col-span-2">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Telefon kontaktowy *
					</label>
					<input
						{...register('telefon')}
						className="w-full border rounded-md p-2 focus:ring-(--main-color) focus:border-(--main-color)"
						placeholder="+48 123 456 789"
					/>
					{errors.telefon && (
						<p className="text-red-500 text-sm mt-1">
							{errors.telefon.message}
						</p>
					)}
				</div>

				<div className="md:col-span-2 pt-4 border-t mt-2">
					<h3 className="text-md font-medium text-gray-800 mb-3">
						Adres zamieszkania (opcjonalnie)
					</h3>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Ulica
					</label>
					<input
						{...register('ulica')}
						className="w-full border rounded-md p-2 focus:ring-(--main-color) focus:border-(--main-color)"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Nr domu / lokalu
					</label>
					<input
						{...register('numer_domu')}
						className="w-full border rounded-md p-2 focus:ring-(--main-color) focus:border-(--main-color)"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Kod pocztowy
					</label>
					<input
						{...register('kod_pocztowy')}
						className="w-full border rounded-md p-2 focus:ring-(--main-color) focus:border-(--main-color)"
						placeholder="XX-XXX"
					/>
					{errors.kod_pocztowy && (
						<p className="text-red-500 text-sm mt-1">
							{errors.kod_pocztowy.message}
						</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Miejscowość
					</label>
					<input
						{...register('miejscowosc')}
						className="w-full border rounded-md p-2 focus:ring-(--main-color) focus:border-(--main-color)"
					/>
				</div>
				<div className="md:col-span-2 pt-4 border-t mt-2">
					<h3 className="text-md font-medium text-gray-800 mb-3">
						Dane do faktury / Firma (opcjonalnie)
					</h3>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						NIP
					</label>
					<input
						{...register('nip')}
						className="w-full border rounded-md p-2 focus:ring-(--main-color) focus:border-(--main-color)"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Nazwa firmy
					</label>
					<input
						{...register('nazwa_firmy')}
						className="w-full border rounded-md p-2 focus:ring-(--main-color) focus:border-(--main-color)"
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
					Dalej
				</button>
			</div>
		</form>
	);
}
