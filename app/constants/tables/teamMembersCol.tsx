import { Column } from '@/types/table';
import { TeamMember } from '@/types/team';
import { Trash2 } from 'lucide-react';

export const teamMembersCol = (
	onRemoveMember: (employeeId: number) => void,
): Column<TeamMember>[] => [
	{
		header: 'ID',
		render: (emp) => <span className="font-bold">#{emp.id}</span>,
	},
	{
		header: 'Imię i Nazwisko',
		render: (emp) => (
			<span className="font-medium">
				{emp.firstName} {emp.lastName}
			</span>
		),
	},
	{
		header: 'Rola',
		render: (emp) => (
			<span className="px-2 py-1 rounded-full text-xs font-semibold bg-(--role-bg) text-(--role-text)">
				{emp.role}
			</span>
		),
	},
	{
		header: 'Edytuj',
		render: (emp) => (
			<button
				onClick={() => onRemoveMember(emp.id)}
				className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-md transition-colors inline-flex text-xs font-medium cursor-pointer"
				title="Usuń z tego zespołu">
				<Trash2 className="w-4 h-4" />
				<span className="ml-1">Wypisz</span>
			</button>
		),
	},
];
