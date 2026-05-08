'use client';

import { Eye } from 'lucide-react';
import Link from 'next/link';

type CeremonyWithRelations = {
	id: number;
	miejscowosc: string;
	data_pogrzebu: Date;
	rodzaj_pochowku: string;
	zmarly: { imie: string; nazwisko: string } | null;
	zleceniodawca: { imie: string; nazwisko: string } | null;
};

export default function CeremoniesTable({
	data,
}: {
	data: CeremonyWithRelations[];
}) {
	const emptyData: string = 'Brak danych';

	return (
		<div className="overflow-x-auto rounded-lg shadow border border-gray-100">
			<table className="w-full text-left">
				<thead>
					<tr className="bg-gray-50 text-xs uppercase border-b">
						<th className="p-4 font-medium">ID</th>
						<th className="p-4 font-medium">Zmarły</th>
						<th className="p-4 font-medium">Zleceniodawca</th>
						<th className="p-4 font-medium">Data pogrzebu</th>
						<th className="p-4 font-medium">Miejscowość</th>
						<th className="p-4 font-medium">
							Szczegóły
						</th>
					</tr>
				</thead>
				<tbody className="text-sm">
					{data.map((ceremony) => (
						<tr key={ceremony.id} className="border-b last:border-0">
							<td className="p-4 font-bold">#{ceremony.id}</td>
							<td className="p-4 font-medium">
								{ceremony.zmarly
									? `${ceremony.zmarly.imie} ${ceremony.zmarly.nazwisko}`
									: emptyData}
							</td>
							<td className="p-4">
								{ceremony.zleceniodawca
									? `${ceremony.zleceniodawca.imie} ${ceremony.zleceniodawca.nazwisko}`
									: emptyData}
							</td>
							<td className="p-4">
								{new Date(ceremony.data_pogrzebu).toLocaleDateString('pl-PL', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
								})}
							</td>
							<td className="p-4">{ceremony.miejscowosc}</td>
							<td className="p-4">
								<div className="flex justify-start">
									<Link
										href={`/dashboard/funerals/${ceremony.id}`}
										className="p-2 hover:text-(--second-color) hover:bg-gray-200 rounded-md transition-all duration-200"
										title="Zobacz szczegóły ceremonii">
										<Eye className="w-5 h-5" />
									</Link>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{data.length === 0 && (
				<div className="p-8 text-center">
					Brak zapisanych ceremonii w bazie danych. Dodaj nowy pogrzeb, aby
					wyświetlić tabelę.
				</div>
			)}
		</div>
	);
}
