import { EmployeeWithRelations } from '@/types/employee';
import { Column } from '@/types/table';

export const employeeCol: Column<EmployeeWithRelations>[] = [
	{
		header: 'Imię i Nazwisko',
		render: (emp) => (
			<span className="font-medium">
				{emp.firstName} {emp.lastName}
			</span>
		),
	},
	{
		header: 'Email',
		accessor: 'email',
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
		header: 'Zespół',
		render: (emp) => (emp.team ? emp.team.teamName : 'Brak danych'),
	},
];
