import { ReactNode } from 'react';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import Header from '../components/Dashboard/Header';

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col md:flex-row">
			<Sidebar />
			<div className="flex-1 flex flex-col">
				<Header />
				<main className="p-4 md:p-8 flex-1 overflow-y-auto">{children}</main>
			</div>
		</div>
	);
}
