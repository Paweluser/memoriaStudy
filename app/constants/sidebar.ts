import { MenuGroup } from '@/types/sidebar';

export const menuGroups: MenuGroup[] = [
	{
		title: 'Dashboard',
		links: [{ label: 'Strona główna', href: '/dashboard' }],
	},
	{
		title: 'Ceremonia',
		links: [
			{ label: 'Dodaj pogrzeb', href: '/dashboard/pogrzeb/nowy' },
			{ label: 'Historia ceremonii', href: '/dashboard/historia' },
		],
	},
	{
		title: 'Personel',
		links: [{ label: 'Pracownicy', href: '/dashboard/pracownicy' }],
	},
];
