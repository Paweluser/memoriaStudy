'use client';

import { TransportWithRelations } from '@/types/history';
import { DataTable } from '../DataTable'; 
import { transportCol } from '@/app/constants/tables/transportCol';

export default function TransportsTable({
    data,
}: {
    data: TransportWithRelations[];
}) {
    return (
        <DataTable
            data={data}
            columns={transportCol}
            getId={(transport) => transport.id}
            emptyMessage="Brak zleceń przewozu w bazie danych."
        />
    );
}