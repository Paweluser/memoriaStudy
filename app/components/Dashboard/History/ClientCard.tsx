import { Contact } from 'lucide-react';

type ClientCardProps = {
    client: {
        firstName: string;
        lastName: string;
        phone: string;
        street: string | null;
        houseNumber: string | null;
        zipCode: string | null;
        city: string | null;
        nip: string | null;
        companyName: string | null;
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
                        {client.firstName} {client.lastName}
                    </li>
                    <li>
                        <span className="font-medium">Telefon:</span>{' '}
                        {client.phone}
                    </li>
                    {(client.street || client.city) && (
                        <li>
                            <span className="font-medium">Adres:</span>{' '}
                            {[
                                [client.street, client.houseNumber].filter(Boolean).join(' '),
                                [client.zipCode, client.city].filter(Boolean).join(' ')
                            ].filter(Boolean).join(', ')}
                        </li>
                    )}
                    {client.companyName && (
                        <li>
                            <span className="font-medium">Firma:</span>{' '}
                            {client.companyName} {client.nip ? `(NIP: ${client.nip})` : ''}
                        </li>
                    )}
                </ul>
            ) : (
                <p className="text-sm">Brak powiązanych danych.</p>
            )}
        </div>
    ); 
}