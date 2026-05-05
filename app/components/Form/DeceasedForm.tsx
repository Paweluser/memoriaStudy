'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deceasedSchema, DeceasedFormValues } from '@/lib/validations/funeral';

type Step1Props = {
	onNext: (data: DeceasedFormValues) => void;
};

export default function DeceasedForm({ onNext }: Step1Props) {
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
	const onSubmit: SubmitHandler<DeceasedFormValues> = (data) => {
		onNext(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
			<h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
				Krok 1: Dane osoby zmarłej
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Imię
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
						Nazwisko
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
						PESEL
					</label>
					<input
						{...register('pesel')}
						className="w-full border rounded-md p-2 focus:ring-(--main-color) focus:border-(--main-color)"
						placeholder="00000000000"
					/>
					{errors.pesel && (
						<p className="text-red-500 text-sm mt-1">{errors.pesel.message}</p>
					)}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Data urodzenia
					</label>
					<input
						type="date"
						{...register('data_urodzenia')}
						className="w-full border rounded-md p-2"
					/>
					{errors.data_urodzenia && (
						<p className="text-red-500 text-sm mt-1">
							{errors.data_urodzenia.message}
						</p>
					)}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Data śmierci
					</label>
					<input
						type="date"
						{...register('data_smierci')}
						className="w-full border rounded-md p-2"
					/>
					{errors.data_smierci && (
						<p className="text-red-500 text-sm mt-1">
							{errors.data_smierci.message}
						</p>
					)}
				</div>
				<div className="md:col-span-2 flex items-center gap-2 mt-2">
					<input
						type="checkbox"
						{...register('ubezpieczony')}
						className="w-4 h-4 text-(--main-color) rounded"
						id="ubezpieczony"
					/>
					<label
						htmlFor="ubezpieczony"
						className="text-sm text-gray-700 font-medium">
						Osoba ubezpieczona
					</label>
				</div>
			</div>

			<div className="flex justify-end pt-4">
				<button
					type="submit"
					className="bg-black text-white px-6 py-2 rounded-md">
					Dalej
				</button>
			</div>
		</form>
	);
}
