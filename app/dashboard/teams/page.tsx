import TeamsTable from '@/app/components/Dashboard/Teams/TeamsTable';
import PageHeader from '@/app/components/Dashboard/PageHeader';
import { getAllTeams } from '@/lib/teams';
import AddTeamDialog from '@/app/components/Dashboard/Teams/TeamsDialog';

export default async function TeamsPage() {
	const teams = await getAllTeams();

	return (
		<div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
			<PageHeader
				title="ZESPOŁY"
				description="Lista wszystkich zespołów zakładu pogrzebowego"
			/>
			<div className='flex justify-center space-x-2 mb-8'>
				<AddTeamDialog />
			</div>
			<TeamsTable data={teams} />
		</div>
	);
}
