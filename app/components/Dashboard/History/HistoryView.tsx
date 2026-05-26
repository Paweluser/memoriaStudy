'use client';

import { useState } from 'react';
import PageHeader from '../PageHeader';
import CeremoniesTable from './CeremoniesTable';
import TransportsTable from './TransportsTable';
import AppButton from '../AppButton';
import { CeremonyWithRelations, TransportWithRelations } from '@/types/history';

type HistoryViewProps = {
    ceremonies: CeremonyWithRelations[]; 
    transports: TransportWithRelations[]; 
};

export default function HistoryView({ ceremonies, transports }: HistoryViewProps) {
    const [activeTab, setActiveTab] = useState<'ceremonie' | 'przewozy'>('ceremonie');

    return (
        <>
            <PageHeader
                title={activeTab === 'ceremonie' ? "HISTORIA CEREMONII" : "HISTORIA PRZEWOZÓW"}
                description={
                    activeTab === 'ceremonie'
                        ? "Lista wszystkich zaplanowanych i zrealizowanych pogrzebów."
                        : "Lista wszystkich zrealizowanych zleceń transportu."
                }
            />

            <div className="flex justify-center space-x-2 mb-8">
                <AppButton
                    onClick={() => setActiveTab('ceremonie')}
                    className={`${
                        activeTab === 'ceremonie'
                            ? 'bg-(--second-color) text-(--main-color) shadow-sm'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    Pogrzeby
                </AppButton>
                <AppButton
                    onClick={() => setActiveTab('przewozy')}
                    className={`${
                        activeTab === 'przewozy'
                            ? 'bg-(--second-color) text-(--main-color) shadow-sm'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    Przewozy
                </AppButton>
            </div>

            {activeTab === 'ceremonie' && (
                <CeremoniesTable data={ceremonies} />
            )}

            {activeTab === 'przewozy' && (
                <TransportsTable data={transports} />
            )}
        </>
    );
}