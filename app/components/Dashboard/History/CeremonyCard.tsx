import { Calendar } from 'lucide-react';

type CeremonyCardProps = {
    ceremony: {
        data_pogrzebu: Date;
        miejscowosc: string;
        rodzaj_pochowku: string;
        uwagi: string | null;
    };
};

export default function CeremonyCard({ ceremony }: CeremonyCardProps) {
    return (
        <div className="p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="flex items-center gap-2 font-bold uppercase mb-4 border-b pb-2">
                <Calendar className="w-5 h-5" /> Dane Ceremonii
            </h2>
            <ul className="space-y-3">
                <li>
                    <span className="font-medium">Data:</span>{' '}
                    {new Date(ceremony.data_pogrzebu).toLocaleDateString('pl-PL')}
                </li>
                <li>
                    <span className="font-medium">Miejscowość:</span>{' '}
                    {ceremony.miejscowosc}
                </li>
                <li>
                    <span className="font-medium">Rodzaj pochówku:</span>{' '}
                    {ceremony.rodzaj_pochowku}
                </li>
                <li>
                    <span className="font-medium">Uwagi:</span>{' '}
                    {ceremony.uwagi || 'Brak uwag'}
                </li>
            </ul>
        </div>
    );
}