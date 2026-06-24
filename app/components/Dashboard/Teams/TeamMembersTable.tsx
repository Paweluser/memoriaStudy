'use client';

import { teamMembersCol } from '@/app/constants/tables/teamMembersCol';
import { DataTable } from '../DataTable';
import { TeamMember } from '@/types/team';

type TeamMembersTableProps = {
    members: TeamMember[];
    onRemoveMember: (employeeId: number) => void;
}

export default function TeamMembersTable({ members, onRemoveMember }: TeamMembersTableProps) {
    return (
        <div>
            <DataTable
                data={members}
                columns={teamMembersCol(onRemoveMember)}
                getId={(emp) => emp.id}
                emptyMessage="Ten zespół nie posiada jeszcze przypisanych członków."
            />
        </div>
    );
}