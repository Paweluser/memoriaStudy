'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormValues } from '@/lib/validations/settings';
import { updateProfile } from '@/actions/settingsActions';
import AppButton from '@/app/components/Dashboard/AppButton';

type EditProfileModalProps = {
	isOpen: boolean;
	onClose: () => void;
	currentUser: {
		id: number;
		imie: string;
		nazwisko: string;
		email: string;
	};
};

export default function EditProfileModal({
	isOpen,
	onClose,
	currentUser,
}: EditProfileModalProps) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			imie: currentUser.imie,
			nazwisko: currentUser.nazwisko,
			email: currentUser.email,
		},
	});

	if (!isOpen) return null;

	const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
		try {
			const result = await updateProfile(currentUser.id, data);

			if (result.success) {
				alert(result.message);
				onClose();
			} else {
				alert(result.message);
			}
		} catch (error) {
			console.error(error);
			alert('Wystąpił problem z połączeniem.');
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
			<div className="rounded-lg shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200">
				<div className="flex justify-between items-center p-5 border-b">
					<h2 className="text-lg font-semibold">Edycja profilu</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition-colors">
					</button>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">Imię</label>
						<input
							{...register('imie')}
							type="text"
							className="w-full border rounded-md p-2.5 text-sm"
						/>
						{errors.imie && (
							<span className="text-red-500 text-xs">
								{errors.imie.message}
							</span>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Nazwisko</label>
						<input
							{...register('nazwisko')}
							type="text"
							className="w-full border rounded-md p-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-200"
						/>
						{errors.nazwisko && (
							<span className="text-red-500 text-xs">
								{errors.nazwisko.message}
							</span>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">
							Adres e-mail
						</label>
						<input
							{...register('email')}
							type="email"
							className="w-full border rounded-md p-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-200"
						/>
						{errors.email && (
							<span className="text-red-500 text-xs">
								{errors.email.message}
							</span>
						)}
					</div>

					<div className="flex justify-end gap-3 pt-4 border-t mt-6">
						<AppButton
							type="button"
							onClick={onClose}
							className="text-sm">
							Anuluj
						</AppButton>
						<AppButton
							type="submit"
							disabled={isSubmitting}
							className="text-sm">
							{isSubmitting ? 'Zapisywanie...' : 'Zapisz zmiany'}
						</AppButton>
					</div>
				</form>
			</div>
		</div>
	);
}
