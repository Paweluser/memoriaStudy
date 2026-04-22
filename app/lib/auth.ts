import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import prisma from '../lib/prisma';
import { Lucia } from 'lucia';
import { cookies } from 'next/headers';

const adapter = new PrismaAdapter(prisma.session, prisma.pracownik);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === 'production',
		},
	},
});

export async function createAuthSession(userId: number) {
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	const cookieStore = await cookies();
	cookieStore.set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
}

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		UserId: number;
	}
}
