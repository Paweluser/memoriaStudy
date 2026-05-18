'use client';

type EmployeeWithRelations = {
    id: number;
    imie: string;
    nazwisko: string;
    email: string;
    rola: string;
    zespol: { nazwa_zespolu: string } | null;
};

export default function EmployeesTable({
    data,
}: {
    data: EmployeeWithRelations[];
}) {
    const emptyData: string = 'Brak danych';

    return (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-100">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-gray-50 text-xs uppercase border-b">
                        <th className="p-4 font-medium">ID</th>
                        <th className="p-4 font-medium">Imię i Nazwisko</th>
                        <th className="p-4 font-medium">Email</th>
                        <th className="p-4 font-medium">Rola</th>
                        <th className="p-4 font-medium">Zespół</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {data.map((pracownik) => (
                        <tr key={pracownik.id} className="border-b last:border-0">
                            <td className="p-4 font-bold">#{pracownik.id}</td>
                            <td className="p-4 font-medium">
                                {pracownik.imie} {pracownik.nazwisko}
                            </td>
                            <td className="p-4">{pracownik.email}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    pracownik.rola === 'KIEROWNIK' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                                }`}>
                                    {pracownik.rola}
                                </span>
                            </td>
                            <td className="p-4">
                                {pracownik.zespol ? pracownik.zespol.nazwa_zespolu : emptyData}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length === 0 && (
                <div className="p-8 text-center">
                    Brak zapisanych pracowników w bazie danych. Dodaj nowego, aby wyświetlić tabelę.
                </div>
            )}
        </div>
    );
}