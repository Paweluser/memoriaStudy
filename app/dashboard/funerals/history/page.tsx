import { getAllCeremonies } from '@/lib/ceremonies';
import { getAllTransports } from '@/lib/transport'; 
import HistoryView from '@/app/components/Dashboard/History/HistoryView';

export default async function HistoryPage() {
    const ceremonies = await getAllCeremonies();
    const transports = await getAllTransports();

    return (
        <div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
            <HistoryView ceremonies={ceremonies} transports={transports} />
        </div>
    );
}
