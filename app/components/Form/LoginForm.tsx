'use client';
import { useActionState } from 'react';
import { login } from '@/actions/authActions';

export default function LoginForm() {
	const [formState, formAction] = useActionState(login, {});

	return (
		<form className="space-y-6 mt-8" action={formAction}>
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
					autoComplete="current-password"
					required
					className="w-full px-4 py-3 rounded-lg border"
				/>
			</div>
			{formState.errors && (
				<ul>
					{Object.keys(formState.errors).map((error) => (
						<li key={error}>{formState.errors[error]}</li>
					))}
				</ul>
			)}
			<button
				type="submit"
				className="w-full flex justify-center py-3 px-4 rounded-lg shadow-sm font-medium transition-colors duration-300 bg-(--second-color) text-(--main-color) hover:bg-(--accent-color) cursor-pointer">
				Zaloguj się
			</button>
		</form>
	);
}
