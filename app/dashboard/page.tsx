import { redirect } from 'next/navigation';
import { verifyAuth } from '../lib/auth';

export default async function DashboardPage() {
	const result = await verifyAuth();

	if (!result.user) {
		redirect('/');
	}

	return <div>Test</div>;
}
