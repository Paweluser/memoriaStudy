import FuneralWizard from '@/app/components/Dashboard/FuneralWizard';

export default function NewFuneralPage() {
	return (
		<div className="p-4 md:p-6 w-full max-w-3xl mx-auto">
			<div className="mb-8 text-center">
				<h1 className="text-2xl md:text-3xl font-(family-name:--julius) font-bold uppercase tracking-wider">
					Nowa Ceremonia
				</h1>
				<p className="mt-2">
					Wypełnij poniższe kroki, aby dodać nowy pogrzeb do systemu.
				</p>
			</div>

			<FuneralWizard />
		</div>
	);
}
