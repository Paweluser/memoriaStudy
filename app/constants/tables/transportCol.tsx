import { Column } from '@/types/table';
import { TransportWithRelations } from '@/types/history';

const emptyData: string = 'Brak danych';

export const transportCol: Column<TransportWithRelations>[] = [
	{
		header: 'Trasa (Skąd - Dokąd)',
		render: (t) => (
			<span>
				<span className="font-medium">{t.transportFrom}</span>
				<span className="mx-2 text-gray-400">→</span>
				<span className="font-medium">{t.transportTo}</span>
			</span>
		),
	},
	{
		header: 'Kierowca',
		render: (t) =>
			t.manager ? (
				<span className="font-medium">
					{t.manager.firstName} {t.manager.lastName}
				</span>
			) : (
				emptyData
			),
	},
	{
		header: 'Pomocnik',
		render: (t) =>
			t.assistant
				? `${t.assistant.firstName} ${t.assistant.lastName}`
				: emptyData,
	},
	{
		header: 'Tel. Zleceniodawcy',
		render: (t) => t.clientPhoneNumber || emptyData,
	},
];
