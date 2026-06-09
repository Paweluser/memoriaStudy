'use client';

export type TeamWithCount = {
	id: number;
	nazwa_zespolu: string;
	_count: {
		pracownik: number;
	};
};

export default function TeamsTable({ data }: { data: TeamWithCount[] }) {
	const emptyData: string = 'Brak danych';

	return (
		<div className="overflow-x-auto rounded-lg shadow border border-gray-100">
			<table className="w-full text-left">
				<thead>
					<tr className="bg-gray-50 text-xs uppercase border-b">
						<th className="p-4 font-medium">ID</th>
						<th className="p-4 font-medium">Nazwa Zespołu</th>
						<th className="p-4 font-medium">Liczba Członków</th>
					</tr>
				</thead>
				<tbody className="text-sm">
					{data.map((team) => (
						<tr
							key={team.id}
							className="border-b last:border-0">
							<td className="p-4 font-bold">#{team.id}</td>
							<td className="p-4 font-medium">
								{team.nazwa_zespolu || emptyData}
							</td>

							<td className="p-4">
								<span
									className={`px-2 py-1 rounded-full text-xs font-semibold ${
										team._count.pracownik > 0
											? 'bg-(--role-bg) text-(--role-text)'
											: 'bg-gray-100 text-gray-500'
									}`}>
									{team._count.pracownik}{' '}
									{team._count.pracownik === 1 ? 'osoba' : 'osób'}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{data.length === 0 && (
				<div className="p-8 text-center text-gray-500">
					Brak zapisanych zespołów w bazie danych. Dodaj nowy, aby wyświetlić
					tabelę.
				</div>
			)}
		</div>
	);
}
