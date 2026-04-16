import AuthWrapper from '../components/AuthWrapper';
import LoginForm from '../components/Form/LoginForm';

export default function LoginPage() {
	return (
		<AuthWrapper
			title="Logowanie"
			description="Wprowadź swoje dane, aby uzyskać dostęp do systemu"
			footerText="Nie posiadasz konta?"
			footerLinkText="Zarejestruj się"
			footerLinkHref="/register"
			maxWidth="max-w-md">
			<LoginForm />
		</AuthWrapper>
	);
}
