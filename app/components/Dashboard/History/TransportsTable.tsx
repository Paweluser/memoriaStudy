'use client';

import { TransportWithRelations } from '@/types/history';

export default function TransportsTable({
    data,
}: {
    data: TransportWithRelations[];
}) {
    const emptyData: string = 'Brak danych';

    return (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-100">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-50 text-xs uppercase border-b">
                        <th className="p-4 font-medium">ID</th>
                        <th className="p-4 font-medium">Trasa (Skąd - Dokąd)</th>
                        <th className="p-4 font-medium">Kierowca</th>
                        <th className="p-4 font-medium">Pomocnik</th>
                        <th className="p-4 font-medium">Tel. Zleceniodawcy</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {data.map((transport) => {
                        const kierowca = transport.pracownik_zlecenie_przewozu_kierownik_idTopracownik;
                        const pomocnik = transport.pracownik_zlecenie_przewozu_pracownik_idTopracownik;

                        return (
                            <tr key={transport.id} className="border-b last:border-0">
                                <td className="p-4 font-bold">#{transport.id}</td>
                                <td className="p-4">
                                    <span className="font-medium">{transport.transport_z}</span>
                                    <span className="mx-2 text-gray-400">→</span>
                                    <span className="font-medium">{transport.transport_do}</span>
                                </td>
                                <td className="p-4 font-medium">
                                    {kierowca
                                        ? `${kierowca.imie} ${kierowca.nazwisko}`
                                        : emptyData}
                                </td>
                                <td className="p-4">
                                    {pomocnik
                                        ? `${pomocnik.imie} ${pomocnik.nazwisko}`
                                        : emptyData}
                                </td>
                                <td className="p-4">{transport.numer_tel_zleceniodawcy || emptyData}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {data.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                    Brak zleceń przewozu w bazie danych.
                </div>
            )}
        </div>
    );
}