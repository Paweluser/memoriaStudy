'use client';
import { useActionState } from 'react';
import { register } from '../../../actions/authActions';
import { AuthFormState } from '@/types/auth';
import FormErrors from './FormErrors';

export default function RegisterForm() {
	const [formState, formAction] = useActionState(register, {} as AuthFormState);

	return (
		<form className="space-y-6 mt-8" action={formAction}>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<label htmlFor="firstName" className="block text-sm">
						Imię
					</label>
					<input
						id="firstName"
						name="firstName"
						type="text"
						required
						className="w-full px-4 py-3 rounded-lg border"
					/>
				</div>

				<div className="space-y-2">
					<label htmlFor="lastName" className="block text-sm">
						Nazwisko
					</label>
					<input
						id="lastName"
						name="lastName"
						type="text"
						required
						className="w-full px-4 py-3 rounded-lg border"
					/>
				</div>
			</div>

			<div className="space-y-2">
				<label htmlFor="email" className="block text-sm">
					Adres e-mail
				</label>
				<input
					id="email"
					name="email"
					type="email"
					autoComplete="email"
					required
					className="w-full px-4 py-3 rounded-lg border"
				/>
			</div>

			<div className="space-y-2">
				<label htmlFor="password" className="block text-sm">
					Hasło
				</label>
				<input
					id="password"
					name="password"
					type="password"
					autoComplete="new-password"
					required
					className="w-full px-4 py-3 rounded-lg border"
				/>
			</div>
			<FormErrors errors={formState.errors} />
			<button
				type="submit"
				className="w-full flex justify-center py-3 px-4 rounded-lg shadow-sm font-medium transition-colors duration-300 bg-(--second-color) text-(--main-color) hover:bg-(--accent-color) cursor-pointer">
				Załóż konto
			</button>
		</form>
	);
}
