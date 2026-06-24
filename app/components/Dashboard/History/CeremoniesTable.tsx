'use client';

import { CeremonyWithRelations } from '@/types/history';
import { DataTable } from '../DataTable';
import { ceremonyCol } from '@/app/constants/tables/ceremonyCol';

export default function CeremoniesTable({
    data,
}: {
    data: CeremonyWithRelations[];
}) {
    return (
        <DataTable
            data={data}
            columns={ceremonyCol}
            getId={(ceremony) => ceremony.id}
            emptyMessage="Brak zapisanych ceremonii w bazie danych. Dodaj nowy pogrzeb, aby wyświetlić tabelę."
        />
    );
}