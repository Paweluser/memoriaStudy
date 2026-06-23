'use client';

type EmployeeWithRelations = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    team: { teamName: string } | null;
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
                        <th className="p-4 font-medium">Imię i Nazwisko</th>
                        <th className="p-4 font-medium">Email</th>
                        <th className="p-4 font-medium">Rola</th>
                        <th className="p-4 font-medium">Zespół</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {data.map((employee) => (
                        <tr key={employee.id} className="border-b last:border-0">
                            <td className="p-4 font-medium">
                                {employee.firstName} {employee.lastName}
                            </td>
                            <td className="p-4">{employee.email}</td>
                            <td className="p-4">
                                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-(--role-bg) text-(--role-text)">
                                    {employee.role}
                                </span>
                            </td>
                            <td className="p-4">
                                {employee.team ? employee.team.teamName : emptyData}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length === 0 && (
                <div className="p-8 text-center">
                    Brak zapisanych pracowników w bazie danych. Dodaj nowego, aby
                    wyświetlić tabelę.
                </div>
            )}
        </div>
    );
}