import { Column } from '@/types/table';
import { TeamWithCount } from '@/types/team';
import { Eye } from 'lucide-react';
import Link from 'next/link';

const emptyData: string = 'Brak danych';

export const teamsCol: Column<TeamWithCount>[] = [
    {
        header: "Nazwa Zespołu",
        render: (team) => <span className="font-medium">{team.teamName || emptyData}</span>
    },
    {
        header: "Liczba Członków",
        render: (team) => (
            <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    team._count.employees > 0
                        ? 'bg-(--role-bg) text-(--role-text)'
                        : 'bg-gray-100 text-gray-500'
                }`}>
                {team._count.employees}{' '}
                {team._count.employees === 1 ? 'osoba' : 'osób'}
            </span>
        )
    },
    {
        header: "Szczegóły",
        render: (team) => (
            <div className="flex justify-start">
                <Link
                    href={`/dashboard/teams/${team.id}`}
                    className="p-2 hover:text-(--second-color) hover:bg-gray-200 rounded-md transition-all duration-200"
                    title="Zobacz szczegóły zespołu">
                    <Eye className="w-5 h-5" />
                </Link>
            </div>
        )
    }
];