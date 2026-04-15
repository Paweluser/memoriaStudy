import Link from 'next/link';
import LoginForm from '../components/Form/LoginForm';

export default function LoginPage() {
	return (
		<main className="flex-1 flex items-center justify-center px-4">
			<div className="w-full p-2 flex-col max-w-md">
				<h2 className="text-center text-3xl">Logowanie</h2>
				<p className="text-center mt-2">
					Wprowadź swoje dane, aby uzyskać dostęp do systemu
				</p>
				<LoginForm />
				<div className="text-center mt-3">
					<p>
						Nie posiadasz konta?
						<Link href="/register" className="font-bold pl-1.5">
							Zarejestruj się
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
}
