import Link from 'next/link';
import RegisterForm from '../components/Form/RegisterForm';

export default function RegisterPage() {
	return (
		<main className="flex-1 flex items-center justify-center px-4">
			<div className="w-full max-w-lg">
				<h2 className="text-center text-3xl uppercase">Rejestracja</h2>
				<p className="text-center mt-2">
					Utwórz nowe konto pracownika w systemie
				</p>
				<RegisterForm />
                <div className="text-center mt-3">
					<p>
						Masz już konto?
						<Link href="/login" className="font-bold pl-1.5">
							Zaloguj się
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
}
