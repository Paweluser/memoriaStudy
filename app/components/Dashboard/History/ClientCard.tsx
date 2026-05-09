import { Contact } from 'lucide-react';

type ClientCardProps = {
    client: {
        imie: string;
        nazwisko: string;
        telefon: string;
        ulica: string | null;
        numer_domu: string | null;
        kod_pocztowy: string | null;
        miejscowosc: string | null;
        nip: string | null;
        nazwa_firmy: string | null;
    } | null;
};

export default function ClientCard({ client }: ClientCardProps) {
    return (
        <div className="p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="flex items-center gap-2 font-bold uppercase mb-4 border-b pb-2">
                <Contact className="w-5 h-5" /> Zleceniodawca
            </h2>
            {client ? (
                <ul className="space-y-3">
                    <li>
                        <span className="font-medium">Imię i nazwisko:</span>{' '}
                        {client.imie} {client.nazwisko}
                    </li>
                    <li>
                        <span className="font-medium">Telefon:</span>{' '}
                        {client.telefon}
                    </li>
                    {(client.ulica || client.miejscowosc) && (
                        <li>
                            <span className="font-medium">Adres:</span>{' '}
                            {[
                                [client.ulica, client.numer_domu].filter(Boolean).join(' '),
                                [client.kod_pocztowy, client.miejscowosc].filter(Boolean).join(' ')
                            ].filter(Boolean).join(', ')}
                        </li>
                    )}
                    {client.nazwa_firmy && (
                        <li>
                            <span className="font-medium">Firma:</span>{' '}
                            {client.nazwa_firmy} {client.nip ? `(NIP: ${client.nip})` : ''}
                        </li>
                    )}
                </ul>
            ) : (
                <p className="text-sm">Brak powiązanych danych.</p>
            )}
        </div>
    );
}