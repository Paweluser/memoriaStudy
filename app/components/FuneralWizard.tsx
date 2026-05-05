'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DeceasedForm from './Form/DeceasedForm';
import ClientForm from './Form/ClientForm';
import CeremonyForm from './Form/CeremonyForm';
import {
	DeceasedFormValues,
	ClientFormValues,
	CeremonyFormValues,
} from '@/lib/validations/funeral';
import { createFuneralTransaction } from '@/actions/funeralActions';

type WizardState = {
	deceased?: DeceasedFormValues;
	client?: ClientFormValues;
};

export default function FuneralWizard() {
	const [step, setStep] = useState<number>(1);
	const [formData, setFormData] = useState<WizardState>({});
	const router = useRouter();

	const handleDeceasedStep = (data: DeceasedFormValues) => {
		setFormData((prev) => ({ ...prev, deceased: data }));
		setStep(2);
	};

	const handleClientStep = (data: ClientFormValues) => {
		setFormData((prev) => ({ ...prev, client: data }));
		setStep(3);
	};

	const handleSubmitFinal = async (data: CeremonyFormValues) => {
		if (!formData.deceased || !formData.client) {
        return; 
    }
		const finalData = {
			deceased: formData.deceased,
			client: formData.client,
			ceremony: data,
		};
		const result = await createFuneralTransaction(finalData);
			if (result.success) {
				alert('Sukces! ' + result.message);
				router.push('/dashboard/funerals'); 
			} else {
				alert('Błąd: ' + result.message);
			}
		};
	
	return (
		<div className="max-w-3xl mx-auto py-4">
			{step === 1 && <DeceasedForm onNext={handleDeceasedStep} />}
			{step === 2 && (
				<ClientForm onNext={handleClientStep} onBack={() => setStep(1)} />
			)}
			{step === 3 && (
				<CeremonyForm onNext={handleSubmitFinal} onBack={() => setStep(2)} />
			)}
		</div>
	);
}
