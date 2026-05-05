import { redirect } from 'next/navigation';
import { verifyAuth } from '../../lib/auth';

export default async function DashboardPage() {
	const result = await verifyAuth();

	if (!result.user) {
		redirect('/');
	}

	return (
		<div className="p-6 rounded-lg shadow-sm border border-gray-100 max-w-4xl">
			<h2 className="text-2xl font-bold mb-4">Podsumowanie dnia</h2>
			<p>Wybierz opcję z menu po lewej stronie, aby rozpocząć pracę.</p>
		</div>
	);
}
