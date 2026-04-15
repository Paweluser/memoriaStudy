import AppLink from './components/AppLink';
import AppTitle from './components/AppTitle';

export default function Home() {
	return (
		<main className="flex-1 flex flex-col items-center justify-center px-4">
			<div className="text-center space-y-6 max-w-2xl">
				<AppTitle />
				<h2 className="text-md md:text-xl font-medium">
					Aplikacja do zarządzania zakładem pogrzebowym
				</h2>
			</div>
			<div className="mt-8 flex flex-col items-center gap-6">
				<AppLink href="/login">Zaloguj się</AppLink>
				<p className="">
					Nie posiadasz konta?
				</p>
				<AppLink href="/register">Załóż konto</AppLink>
			</div>
		</main>
	);
}
