'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarLinkProps = {
	href: string;
	label: string;
}

export default function SidebarLink({ href, label }: SidebarLinkProps) {
	const pathname = usePathname();
	const isActive = pathname === href;
	return (
		<li>
			<Link
				href={href}
				className={`block px-4 py-2 rounded-lg transition-colors duration-300 ${
					isActive
						? 'bg-(--second-color) text-(--main-color)'
						: 'hover:text-(--accent-color)'
				}`}>
				{label}
			</Link>
		</li>
	);
}
