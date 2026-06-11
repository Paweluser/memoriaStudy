'use client';

import { assignEmployeeToTeam } from '@/actions/teamActions';
import TeamMembersTable from './TeamMembersTable';
import AddTeamMemberForm from '../../Form/AddTeamMemberForm';

type Employee = {
	id: number;
	imie: string;
	nazwisko: string;
	rola: string;
};

type TeamWithEmployees = {
	id: number;
	nazwa_zespolu: string;
	pracownik: Employee[];
};

type TeamDetailsViewProps = {
	team: TeamWithEmployees;
	availableEmployees: Employee[];
};

export default function TeamDetailsView({
	team,
	availableEmployees,
}: TeamDetailsViewProps) {
	const handleAddMember = async (employeeId: number) => {
		return await assignEmployeeToTeam(employeeId, team.id);
	};

	const handleRemoveMember = async (employeeId: number) => {
		try {
			const result = await assignEmployeeToTeam(employeeId, null);
			if (!result.success) alert(result.message);
		} catch {
			alert('Wystąpił nieoczekiwany błąd.');
		}
	};

	return (
		<div className="space-y-8 mt-8">
			<AddTeamMemberForm
				availableEmployees={availableEmployees}
				onAddMember={handleAddMember}
			/>
			<TeamMembersTable
				members={team.pracownik}
				onRemoveMember={handleRemoveMember}
			/>
		</div>
	);
}
