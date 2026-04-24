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

export async function verifyAuth() {
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get(lucia.sessionCookieName);

	if (!sessionCookie) {
		return {
			user: null,
			session: null,
		};
	}

	const sessionId = sessionCookie.value;

	if (!sessionId) {
		return {
			user: null,
			session: null,
		};
	}

	const result = await lucia.validateSession(sessionId);

	try {
		if (result.session && result.session.fresh) {
			const sessionCookie = lucia.createSessionCookie(result.session.id);
			const cookieStore = await cookies();
			cookieStore.set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
		}
		if (!result.session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			const cookieStore = await cookies();
			cookieStore.set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
		}
	} catch {}

	return result;
}

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		UserId: number;
	}
}
