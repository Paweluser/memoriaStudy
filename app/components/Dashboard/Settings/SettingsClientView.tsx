'use client';

import { useState, useTransition } from 'react';
import AppButton from '@/app/components/Dashboard/AppButton';
import { User, KeyRound, LogOut } from 'lucide-react';
import EditProfileModal from './EditProfileModal';
import ChangePasswordModal from './ChangePasswordModal';
import { logout } from '@/actions/authActions';

interface SettingsClientViewProps {
    currentUser: {
        id: number;
        imie: string;
        nazwisko: string;
        email: string;
    };
}

export default function SettingsClientView({ currentUser }: SettingsClientViewProps) {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    
    const [isPending, startTransition] = useTransition();

    const handleLogout = () => {
        if (confirm('Czy na pewno chcesz się wylogować?')) {
            startTransition(async () => {
                await logout();
            });
        }
    };

    return (
        <>
            <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 space-y-4">
                    <AppButton 
                        onClick={() => setIsProfileModalOpen(true)}
                        className="w-full flex items-center justify-center gap-2"
                    >
                        <User className="w-5 h-5" />
                        Edytuj dane profilowe
                    </AppButton>

                    <AppButton 
                        onClick={() => setIsPasswordModalOpen(true)}
                        className="w-full flex items-center justify-center gap-2"
                    >
                        <KeyRound className="w-5 h-5" />
                        Zmień hasło
                    </AppButton>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50">
                    <button 
                        onClick={handleLogout}
                        disabled={isPending}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors border border-red-200 disabled:opacity-50"
                    >
                        <LogOut className="w-5 h-5" />
                        {isPending ? 'Wylogowywanie...' : 'Wyloguj się'}
                    </button>
                </div>
            </div>
            <EditProfileModal 
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                currentUser={currentUser}
            />
            <ChangePasswordModal 
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                userId={currentUser.id}
            />
        </>
    );
}