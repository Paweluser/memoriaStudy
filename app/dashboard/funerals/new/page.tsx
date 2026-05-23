import FuneralWizard from '@/app/components/Dashboard/FuneralWizard';
import PageHeader from '@/app/components/Dashboard/PageHeader';

export default function NewFuneralPage() {
	return (
		<div className="p-4 md:p-6 w-full max-w-3xl mx-auto">
			<PageHeader
				title="NOWA CEREMONIA"
				description="Wypełnij poniższe kroki, aby dodać nowy pogrzeb do systemu."
			/>
			<FuneralWizard />
		</div>
	);
}
