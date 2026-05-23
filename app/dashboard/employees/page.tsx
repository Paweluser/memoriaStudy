import EmployeesTable from '@/app/components/Dashboard/Employees/EmployeesTable';
import PageHeader from '@/app/components/Dashboard/PageHeader';
import { getEmployees } from '@/lib/users';

export default async function EmployeesPage() {
	const employees = await getEmployees();

	return (
		<div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
			<PageHeader
				title="PRACOWNICY"
				description="Lista wszystkich pracowników zakładu pogrzebowego"
			/>
			<EmployeesTable data={employees} />
		</div>
	);
}
