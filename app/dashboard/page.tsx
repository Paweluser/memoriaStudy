import { redirect } from 'next/navigation';
import { verifyAuth } from '@/lib/auth';
import { getUserById } from '@/lib/users';

export default async function DashboardPage() {
    const result = await verifyAuth();

    if (!result.user) {
        redirect('/');
    }

    const currentUser = await getUserById(result.user.id);

    return (
        <div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
            <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 max-w-4xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Dzień dobry, {currentUser?.firstName || 'Pracowniku'}!
                </h2>
                <p>
                    Witaj w systemie Memoria. Wybierz opcję z menu po lewej stronie, aby rozpocząć pracę.
                </p>
            </div>
        </div>
    );
}