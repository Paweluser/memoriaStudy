import { menuGroups } from '@/app/constants/sidebar';
import SidebarLink from './SidebarLink';

type SidebarListProps = {
	onClose?: () => void;
};

export default function SidebarList({ onClose }: SidebarListProps) {
	return (
		<nav className="flex-1 p-4 overflow-y-auto">
			<ul className="space-y-6">
				{menuGroups.map((group) => (
					<li key={group.title}>
						<div className="font-semibold uppercase mb-2 px-2">
							{group.title}
						</div>
						<ul className="space-y-1">
							{group.links.map((link) => (
								<SidebarLink
									key={link.href}
									href={link.href}
									label={link.label}
									icon={<link.icon className="w-5 h-5" />}
									onClick={onClose}
								/>
							))}
						</ul>
					</li>
				))}
			</ul>
		</nav>
	);
}
