import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthWrapperProps {
	title: string;
	description: string;
	children: ReactNode; 
	footerText: string;
	footerLinkText: string;
	footerLinkHref: string;
	maxWidth?: string;
}

export default function AuthWrapper({
	title,
	description,
	children,
	footerText,
	footerLinkText,
	footerLinkHref,
	maxWidth = 'max-w-md', 
}: AuthWrapperProps) {
	return (
		<main className="flex-1 flex items-center justify-center px-4">
			<div className={`w-full p-2 flex-col ${maxWidth}`}>
				<h2 className="text-center text-3xl uppercase">{title}</h2>
				<p className="text-center mt-2">{description}</p>
				<div className="mt-6">{children}</div>
				<div className="text-center mt-4 pt-4">
					<p className="text-sm">
						{footerText}
						<Link
							href={footerLinkHref}
							className="font-bold pl-1.5">
							{footerLinkText}
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
}
