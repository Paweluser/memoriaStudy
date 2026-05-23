import CeremoniesTable from '@/app/components/Dashboard/History/CeremoniesTable';
import PageHeader from '@/app/components/Dashboard/PageHeader';
import { getAllCeremonies } from '@/lib/ceremonies';

export default async function HistoryPage() {
	const ceremonies = await getAllCeremonies();

	return (
		<div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
			<PageHeader 
                title="HISTORIA CEREMONII" 
                description="Lista wszystkich zaplanowanych i zrealizowanych pogrzebów." 
            />
			<CeremoniesTable data={ceremonies} />
		</div>
	);
}
