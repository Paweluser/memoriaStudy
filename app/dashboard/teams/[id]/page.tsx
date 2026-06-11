import { notFound } from 'next/navigation';
import { getTeamById, getAvailableEmployees } from '@/lib/teams';
import PageHeader from '@/app/components/Dashboard/PageHeader';
import TeamDetailsView from '@/app/components/Dashboard/Teams/TeamDetailsView';

type PageProps = {
    params: {
        id: string;
    };
}

export default async function TeamDetailsPage({ params }: PageProps) {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    
    if (isNaN(id)) {
        notFound();
    }

    const team = await getTeamById(id);
    
    if (!team) {
        notFound();
    }

    const availableEmployees = await getAvailableEmployees();

    return (
        <div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
            <PageHeader
                title={`ZESPÓŁ: ${team.nazwa_zespolu.toUpperCase()}`}
                description="Zarządzanie składem osobowym"
            />
            
            <TeamDetailsView 
                team={team} 
                availableEmployees={availableEmployees} 
            />
        </div>
    );
}