import EmployeesTable from '@/app/components/Dashboard/Employees/EmployeesTable';
import { getEmployees } from '@/lib/users';

export default async function EmployeesPage() {
	const employees = await getEmployees();

	return (
		<div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
			<div className="mb-8 text-center">
				<h1 className="text-2xl md:text-3xl font-(family-name:--julius) font-bold uppercase tracking-wider">
					PRACOWNICY
				</h1>
				<p className="mt-2">Lista wszystkich pracowników zakładu pogrzebowego</p>
			</div>
			<EmployeesTable data={employees} />
		</div>
	);
}
