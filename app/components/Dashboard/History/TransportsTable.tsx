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
                        <th className="p-4 font-medium">Trasa (Skąd - Dokąd)</th>
                        <th className="p-4 font-medium">Kierowca</th>
                        <th className="p-4 font-medium">Pomocnik</th>
                        <th className="p-4 font-medium">Tel. Zleceniodawcy</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {data.map((transport) => {
                        const kierowca = transport.manager; 
                        const pomocnik = transport.assistant; 

                        return (
                            <tr key={transport.id} className="border-b last:border-0">
                                <td className="p-4">
                                    <span className="font-medium">{transport.transportFrom}</span>
                                    <span className="mx-2 text-gray-400">→</span>
                                    <span className="font-medium">{transport.transportTo}</span>
                                </td>
                                <td className="p-4 font-medium">
                                    {kierowca
                                        ? `${kierowca.firstName} ${kierowca.lastName}`
                                        : emptyData}
                                </td>
                                <td className="p-4">
                                    {pomocnik
                                        ? `${pomocnik.firstName} ${pomocnik.lastName}`
                                        : emptyData}
                                </td>
                                <td className="p-4">{transport.clientPhoneNumber || emptyData}</td>
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