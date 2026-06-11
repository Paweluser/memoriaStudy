'use client';

import { useState } from 'react';
import AppButton from '@/app/components/Dashboard/AppButton';

type Employee = {
	id: number;
	imie: string;
	nazwisko: string;
	rola: string;
};

type AddTeamMemberFormProps = {
	availableEmployees: Employee[];
	onAddMember: (
		employeeId: number,
	) => Promise<{ success: boolean; message?: string }>;
};

export default function AddTeamMemberForm({
	availableEmployees,
	onAddMember,
}: AddTeamMemberFormProps) {
	const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!selectedEmployeeId) return;

		setIsSubmitting(true);
		try {
			const result = await onAddMember(parseInt(selectedEmployeeId, 10));
			if (result.success) {
				setSelectedEmployeeId('');
			} else {
				alert(result.message);
			}
		} catch {
			alert('Wystąpił nieoczekiwany błąd.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='w-full flex justify-center'>
		    <div className="p-5 rounded-lg border border-gray-200 shadow-sm max-w-2xl">
    			<h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
    				Dodaj pracownika do zespołu
    			</h3>
    
    			<form
    				onSubmit={handleSubmit}
    				className="flex flex-col sm:flex-row gap-4 items-end">
    				<div className="flex-1 w-full">
    					<select
    						value={selectedEmployeeId}
    						onChange={(e) => setSelectedEmployeeId(e.target.value)}
    						className="w-full border border-gray-300 rounded-md px-3 h-10 text-sm">
    						<option value="">Wybierz osobę z listy...</option>
    						{availableEmployees.map((emp) => (
    							<option key={emp.id} value={emp.id}>
    								{emp.imie} {emp.nazwisko} ({emp.rola})
    							</option>
    						))}
    					</select>
    				</div>
    
    				<AppButton
    					type="submit"
    					className="w-full sm:w-auto px-6! h-10 flex items-center justify-center text-sm disabled:opacity-50">
    					{isSubmitting ? 'Dodawanie...' : 'Przypisz'}
    				</AppButton>
    			</form>
    
    			{availableEmployees.length === 0 && (
    				<p className="text-xs text-gray-400 mt-3">
    					Brak wolnych pracowników. Wszyscy są już przypisani.
    				</p>
    			)}
    		</div>
		</div>
	);
}
