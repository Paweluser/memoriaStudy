'use server';
import { hashUserPassword, verifyPassword } from '@/lib/hash';
import { createUser, getUserByEmail } from '@/lib/users';
import { Prisma } from '@/app/generated/prisma'; 
import { createAuthSession, lucia, verifyAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AuthErrors, AuthFormState } from '@/types/auth';
import { cookies } from 'next/headers';

export async function register(
    prevState: AuthFormState,
    formData: FormData,
): Promise<AuthFormState> {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const errors: AuthErrors = {};

    if (!firstName || firstName.trim() === '') {
        errors.firstName = 'Imię jest wymagane.';
    }
    if (!lastName || lastName.trim() === '') {
        errors.lastName = 'Nazwisko jest wymagane.';
    }

    if (!email.includes('@')) {
        errors.email = 'Proszę wpisać poprawny adres e-mail.';
    }

    if (password.trim().length < 6) {
        errors.password = 'Hasło musi mieć co najmniej 6 znaków.';
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    const hashedPassword = hashUserPassword(password);
    let newEmployeeId: number;

    try {
        const newEmployee = await createUser(
            firstName,
            lastName,
            email,
            hashedPassword,
        );
        newEmployeeId = newEmployee.id;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return {
                    errors: {
                        email: 'Konto z tym adresem e-mail już istnieje w systemie Memoria.',
                    },
                };
            }
        }
        console.error(error);
        return { errors: { server: 'Błąd podczas zapisu do bazy danych.' } };
    }
    await createAuthSession(newEmployeeId);
    redirect('/dashboard');
}

export async function login(
    prevState: AuthFormState,
    formData: FormData,
): Promise<AuthFormState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {
            errors: {
                email: 'Nie znaleziono takiego użytkownika, spróbuj ponownie.',
            },
        };
    }

    const isValidPassword = verifyPassword(existingUser.password, password);

    if (!isValidPassword) {
        return {
            errors: {
                password: 'Nie znaleziono takiego użytkownika, spróbuj ponownie.',
            },
        };
    }

    await createAuthSession(existingUser.id);
    redirect('/dashboard');
}

export async function logout() {
    const { session } = await verifyAuth();
    
    if (!session) {
        redirect('/login');
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    const cookieStore = await cookies();
    cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );

    redirect('/login');
}