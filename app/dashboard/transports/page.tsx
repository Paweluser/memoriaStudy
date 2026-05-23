import TransportForm from '@/app/components/Form/TransportForm';
import { getOperationalEmployees } from '@/lib/users';
import PageHeader from '@/app/components/Dashboard/PageHeader';

export default async function AddTransportPage() {
	const employees = await getOperationalEmployees();

	return (
		<div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
			<PageHeader
				title="NOWY PRZEWÓZ"
				description="Wypełnij poniższe dane, aby zlecić transport ciała."
			/>
			<div className="max-w-3xl mx-auto">
				<TransportForm employees={employees} />
			</div>
		</div>
	);
}
