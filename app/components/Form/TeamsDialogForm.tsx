'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { teamSchema, TeamFormValues } from '@/lib/validations/teams';
import { createTeam } from '@/actions/teamActions';
import { X } from 'lucide-react';
import AppButton from '@/app/components/Dashboard/AppButton'; 

export default function AddTeamDialog() {
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TeamFormValues>({
        resolver: zodResolver(teamSchema),
    });

    const onSubmit: SubmitHandler<TeamFormValues> = async (data) => {
        try {
            const result = await createTeam(data);
            
            if (result.success) {
                alert(result.message);
                reset();
                setIsOpen(false);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Błąd klienta:', error);
            alert('Wystąpił problem z połączeniem.');
        }
    };

    return (
        <>
            <AppButton 
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2"
            >
                Dodaj zespół
            </AppButton>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="rounded-lg shadow-xl w-full max-w-md">
                        
                        <div className="flex justify-between items-center p-5 border-b">
                            <h2 className="text-lg font-semibold">Nowy zespół</h2>
                            <button 
                                onClick={() => setIsOpen(false)} 
                                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-5">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Nazwa zespołu
                                </label>
                                <input
                                    {...register('teamName')}
                                    type="text"
                                    className="w-full border rounded-md p-2.5 text-sm"
                                />
                                {errors.teamName && (
                                    <span className="text-(--error-color) text-xs mt-1 block">
                                        {errors.teamName.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <AppButton
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 text-sm cursor-pointer"
                                >
                                    Anuluj
                                </AppButton>
                                
                                <AppButton
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4! py-2! text-sm disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Zapisywanie...' : 'Zapisz zespół'}
                                </AppButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}