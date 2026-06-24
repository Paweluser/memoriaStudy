'use client';

import { Column } from '@/types/table';
import React from 'react';

type DataTableProps<T> = {
	data: T[];
	columns: Column<T>[];
	getId: (item: T) => string | number;
	emptyMessage?: string;
};

export function DataTable<T>({
	data,
	columns,
	getId,
	emptyMessage = 'Brak danych',
}: DataTableProps<T>) {
	return (
		<div className="overflow-x-auto rounded-lg shadow border border-gray-100">
			<table className="w-full text-left">
				<thead>
					<tr className="bg-gray-50 text-xs uppercase border-b">
						{columns.map((col, index) => (
							<th key={index} className="p-4 font-medium">
								{col.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="text-sm">
					{data.map((item) => (
						<tr
							key={getId(item)}
							className="border-b last:border-0 hover:bg-gray-50/50 transition-colors duration-150">
							{columns.map((col, index) => (
								<td key={index} className="p-4">
									{col.render
										? col.render(item)
										: (item[col.accessor as keyof T] as React.ReactNode) || '-'}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

			{data.length === 0 && (
				<div className="p-8 text-center text-gray-500">{emptyMessage}</div>
			)}
		</div>
	);
}
