'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema, PasswordFormValues } from '@/lib/validations/settings';
import AppButton from '@/app/components/Dashboard/AppButton';
import { changePassword } from '@/actions/authActions';

type ChangePasswordModalProps = {
    isOpen: boolean;
    onClose: () => void;
    userId: number;
}

export default function ChangePasswordModal({ isOpen, onClose, userId }: ChangePasswordModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
    });

    if (!isOpen) return null;

    const onSubmit: SubmitHandler<PasswordFormValues> = async (data) => {
        try {
            const result = await changePassword(userId, data);
            
            if (result.success) {
                alert(result.message);
                reset(); 
                onClose(); 
            } else {
                alert(result.message); 
            }
        } catch (error) {
            console.error(error);
            alert('Wystąpił problem z połączeniem.');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="rounded-lg shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-5 border-b">
                    <h2 className="text-lg font-semibold">Zmiana hasła</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Obecne hasło</label>
                        <input
                            {...register('currentPassword')}
                            type="password"
                            className="w-full border rounded-md p-2.5 text-sm"
                        />
                        {errors.currentPassword && <span className="text-red-500 text-xs">{errors.currentPassword.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Nowe hasło</label>
                        <input
                            {...register('newPassword')}
                            type="password"
                            className="w-full border rounded-md p-2.5 text-sm"
                        />
                        {errors.newPassword && <span className="text-red-500 text-xs">{errors.newPassword.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Potwierdź nowe hasło</label>
                        <input
                            {...register('confirmPassword')}
                            type="password"
                            className="w-full border rounded-md p-2.5 text-sm"
                        />
                        {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                        <AppButton
                            type="button"
                            onClick={() => {
                                reset();
                                onClose();
                            }}
                            className="text-sm"
                        >
                            Anuluj
                        </AppButton>
                        <AppButton
                            type="submit"
                            disabled={isSubmitting}
                            className="text-sm"
                        >
                            {isSubmitting ? 'Zapisywanie...' : 'Zmień hasło'}
                        </AppButton>
                    </div>
                </form>
            </div>
        </div>
    );
}