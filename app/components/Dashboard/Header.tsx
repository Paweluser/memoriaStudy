export default async function Header() {
	return (
		<header className="border-b p-6 flex justify-between items-center md:hidden">
			<div className="font-(family-name:--julius) font-bold text-xl tracking-widest">
				MEMORIA
			</div>
			<div className="flex items-center gap-3">
				<span className="text-sm font-medium">Witaj!</span>
			</div>
		</header>
	);
}
