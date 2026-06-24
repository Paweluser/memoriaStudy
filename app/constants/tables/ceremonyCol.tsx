import { Column } from '@/types/table';
import { CeremonyWithRelations } from '@/types/history';
import { Eye } from 'lucide-react';
import Link from 'next/link';

const emptyData: string = 'Brak danych';

export const ceremonyCol: Column<CeremonyWithRelations>[] = [
	{
		header: 'Zmarły',
		render: (ceremony) =>
			ceremony.deceased ? (
				<span className="font-medium">
					{ceremony.deceased.firstName} {ceremony.deceased.lastName}
				</span>
			) : (
				emptyData
			),
	},
	{
		header: 'Zleceniodawca',
		render: (ceremony) =>
			ceremony.client
				? `${ceremony.client.firstName} ${ceremony.client.lastName}`
				: emptyData,
	},
	{
		header: 'Data pogrzebu',
		render: (ceremony) =>
			new Date(ceremony.funeralDate).toLocaleDateString('pl-PL', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			}),
	},
	{
		header: 'Miejscowość',
		accessor: 'city',
	},
	{
		header: 'Szczegóły',
		render: (ceremony) => (
			<div className="flex justify-start">
				<Link
					href={`/dashboard/funerals/${ceremony.id}`}
					className="p-2 hover:text-(--second-color) hover:bg-gray-200 rounded-md transition-all duration-200"
					title="Zobacz szczegóły ceremonii">
					<Eye className="w-5 h-5" />
				</Link>
			</div>
		),
	},
];
