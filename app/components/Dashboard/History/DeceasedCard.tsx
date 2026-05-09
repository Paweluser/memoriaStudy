import { User } from 'lucide-react';

type DeceasedCardProps = {
	deceased: {
		imie: string;
		nazwisko: string;
		pesel: string;
		data_urodzenia: Date;
		data_smierci: Date;
		ubezpieczony: boolean;
	} | null;
};

export default function DeceasedCard({ deceased }: DeceasedCardProps) {
	return (
		<div className="p-6 rounded-lg shadow-sm border border-gray-100">
			<h2 className="flex items-center gap-2 font-bold uppercase mb-4 border-b pb-2">
				<User className="w-5 h-5" /> Zmarły
			</h2>
			{deceased ? (
				<ul className="space-y-3">
					<li>
						<span className="font-medium">Imię i nazwisko:</span>{' '}
						{deceased.imie} {deceased.nazwisko}
					</li>
					<li>
						<span className="font-medium">PESEL:</span> {deceased.pesel}
					</li>
					<li>
						<span className="font-medium">Data ur.:</span>{' '}
						{new Date(deceased.data_urodzenia).toLocaleDateString('pl-PL')}
					</li>
					<li>
						<span className="font-medium">Data śm.:</span>{' '}
						{new Date(deceased.data_smierci).toLocaleDateString('pl-PL')}
					</li>
					<li>
						<span className="font-medium">Ubezpieczony:</span>{' '}
						{deceased.ubezpieczony ? 'Tak' : 'Nie'}
					</li>
				</ul>
			) : (
				<p className="text-sm">Brak powiązanych danych.</p>
			)}
		</div>
	);
}
