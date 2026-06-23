import { User } from 'lucide-react';

type DeceasedCardProps = {
    deceased: {
        firstName: string;
        lastName: string;
        pesel: string;
        birthDate: Date;
        deathDate: Date;
        insured: boolean;
    } | null;
};

export default function DeceasedCard({ deceased }: DeceasedCardProps) {
    return (
        <div className="p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="flex items-center gap-2 font-bold uppercase mb-4 border-b pb-2">
                <User className="w-5 h-5" /> Zmarły
            </h2>
            {deceased ? (
                <ul className="space-y-3">
                    <li>
                        <span className="font-medium">Imię i nazwisko:</span>{' '}
                        {deceased.firstName} {deceased.lastName}
                    </li>
                    <li>
                        <span className="font-medium">PESEL:</span> {deceased.pesel}
                    </li>
                    <li>
                        <span className="font-medium">Data ur.:</span>{' '}
                        {new Date(deceased.birthDate).toLocaleDateString('pl-PL')}
                    </li>
                    <li>
                        <span className="font-medium">Data śm.:</span>{' '}
                        {new Date(deceased.deathDate).toLocaleDateString('pl-PL')}
                    </li>
                    <li>
                        <span className="font-medium">Ubezpieczony:</span>{' '}
                        {deceased.insured ? 'Tak' : 'Nie'}
                    </li>
                </ul>
            ) : (
                <p className="text-sm">Brak powiązanych danych.</p>
            )}
        </div>
    );
}