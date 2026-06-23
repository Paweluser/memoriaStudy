'use client';

import { Trash2 } from 'lucide-react';

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
};

type TeamMembersTableProps = {
    members: Employee[];
    onRemoveMember: (employeeId: number) => void;
}

export default function TeamMembersTable({ members, onRemoveMember }: TeamMembersTableProps) {
    return (
        <div>
            <div className="overflow-x-auto rounded-lg shadow border border-gray-100">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 text-xs uppercase border-b">
                            <th className="p-4 font-medium">ID</th>
                            <th className="p-4 font-medium">Imię i Nazwisko</th>
                            <th className="p-4 font-medium">Rola</th>
                            <th className="p-4 font-medium">Edytuj</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {members.map((emp) => (
                            <tr key={emp.id} className="border-b last:border-0">
                                <td className="p-4 font-bold">#{emp.id}</td>
                                <td className="p-4 font-medium">{emp.firstName} {emp.lastName}</td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-(--role-bg) text-(--role-text)">
                                        {emp.role}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => onRemoveMember(emp.id)}
                                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-md transition-colors inline-flex text-xs font-medium cursor-pointer"
                                        title="Usuń z tego zespołu"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span className="ml-1">Wypisz</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {members.length === 0 && (
                    <div className="p-8 text-center text-gray-500 text-sm">
                        Ten zespół nie posiada jeszcze przypisanych członków.
                    </div>
                )}
            </div>
        </div>
    );
}