import type { Metadata } from 'next';
import { Roboto, Julius_Sans_One } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';

const robotoSans = Roboto({
	weight: '400',
	variable: '--roboto',
	subsets: ['latin-ext'],
});

const juliusSansOne = Julius_Sans_One({
	weight: '400',
	variable: '--julius',
	subsets: ['latin-ext'],
});

export const metadata: Metadata = {
	title: 'Memoria',
	description: 'Aplikacja wspomagająca zarządzanie zakładem pogrzebowym',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${robotoSans.className} ${juliusSansOne.variable} h-full antialiased`}
			suppressHydrationWarning>
			<body className="min-h-full flex flex-col text-(--second-color) font-(family-name:--roboto) bg-(--main-color)">
				{children}
			</body>
		</html>
	);
}
