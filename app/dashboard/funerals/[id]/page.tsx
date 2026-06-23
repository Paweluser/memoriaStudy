import { notFound } from 'next/navigation';
import { getCeremonyById } from '@/lib/ceremonies';
import AppLink from '@/app/components/AppLink';
import DeceasedCard from '@/app/components/Dashboard/History/DeceasedCard';
import CeremonyCard from '@/app/components/Dashboard/History/CeremonyCard';
import ClientCard from '@/app/components/Dashboard/History/ClientCard';

type CeremonyDetailsPageProps = {
    params: Promise<{ id: string }>;
};

export default async function CeremonyDetailsPage({
    params,
}: CeremonyDetailsPageProps) {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);

    if (!Number.isInteger(id)) {
        notFound();
    }

    const ceremony = await getCeremonyById(id);

    if (!ceremony) {
        notFound();
    }

    return (
        <div className="p-4 md:p-6 w-full max-w-5xl mx-auto">
            <div className="mb-8 pb-6 text-center">
                <h1 className="text-2xl md:text-3xl font-(family-name:--julius) font-bold uppercase tracking-wider">
                    Ceremonia {ceremony.id}
                </h1>
                <p className="mt-2">
                    Szczegółowe informacje dotyczące zaplanowanego pochówku.
                </p>
            </div>
            <div className="flex justify-center flex-col gap-6 mb-8">
                <DeceasedCard deceased={ceremony.deceased} />
                <ClientCard client={ceremony.client} />
                <CeremonyCard ceremony={ceremony} />
            </div>
            <AppLink href="/dashboard/funerals/history">Wróć do historii</AppLink>
        </div>
    );
}