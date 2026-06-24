'use client';

import { TeamWithCount } from '@/types/team';
import { DataTable } from '../DataTable'; 
import { teamsCol } from '@/app/constants/tables/teamsCol';

export default function TeamsTable({ data }: { data: TeamWithCount[] }) {
    return (
        <DataTable
            data={data}
            columns={teamsCol}
            getId={(team) => team.id}
            emptyMessage="Brak zapisanych zespołów w bazie danych. Dodaj nowy, aby wyświetlić tabelę."
        />
    );
}
