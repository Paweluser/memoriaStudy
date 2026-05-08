import CeremoniesTable from '@/app/components/Dashboard/History/CeremoniesTable';
import { getAllCeremonies } from '@/lib/ceremonies';

export default async function HistoryPage() {
	const ceremonies = await getAllCeremonies();

	return (
		<div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
			<div className="mb-8 text-center">
				<h1 className="text-2xl md:text-3xl font-(family-name:--julius) font-bold uppercase tracking-wider">
					Historia Ceremonii
				</h1>
				<p className="mt-2">
					Lista wszystkich zaplanowanych i zrealizowanych pogrzebów.
				</p>
			</div>
			<CeremoniesTable data={ceremonies} />
		</div>
	);
}
