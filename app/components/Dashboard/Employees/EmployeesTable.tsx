'use client';

import { EmployeeWithRelations } from '@/types/employee';
import { DataTable } from '../DataTable';
import { employeeCol } from '@/app/constants/tables/employeeCol';

export default function EmployeesTable({
	data,
}: {
	data: EmployeeWithRelations[];
}) {
	return (
		<DataTable
			data={data}
			columns={employeeCol}
			getId={(emp) => emp.id}
			emptyMessage="Brak zapisanych pracowników w bazie danych. Dodaj nowego, aby wyświetlić tabelę."
		/>
	);
}
