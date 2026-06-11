import { redirect } from 'next/navigation';
import { verifyAuth } from '@/lib/auth';
import { getUserById } from '@/lib/users';
import PageHeader from '@/app/components/Dashboard/PageHeader';
import SettingsClientView from '@/app/components/Dashboard/Settings/SettingsClientView';

export default async function SettingsPage() {
    const { user } = await verifyAuth();

    if (!user) {
        redirect('/login');
    }

    const currentUser = await getUserById(user.id);

    if (!currentUser) {
        redirect('/login');
    }

    return (
        <div className="p-4 md:p-6 w-full max-w-7xl mx-auto flex flex-col items-center">
            <div className="w-full text-center mb-8">
                <PageHeader
                    title="USTAWIENIA KONTA"
                    description="Zarządzaj swoimi danymi"
                />
            </div>

            <SettingsClientView currentUser={currentUser} />
        </div>
    );
}