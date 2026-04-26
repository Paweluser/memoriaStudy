export type AuthErrors = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    server?: string;
};

export type AuthFormState = {
    errors?: AuthErrors;
}