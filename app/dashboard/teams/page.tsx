import TeamsTable from '@/app/components/Dashboard/Teams/TeamsTable';
import PageHeader from '@/app/components/Dashboard/PageHeader';
import { getAllTeams } from '@/lib/teams';

export default async function TeamsPage() {
    const teams = await getAllTeams();

    return (
        <div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
            <PageHeader
                title="ZESPOŁY"
                description="Lista wszystkich zespołów zakładu pogrzebowego"
            />
            <TeamsTable data={teams} />
        </div>
    );
}