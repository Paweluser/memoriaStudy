import AuthWrapper from "../components/AuthWrapper";
import RegisterForm from "../components/Form/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthWrapper
      title="Rejestracja"
      description="Utwórz nowe konto pracownika w systemie"
      footerText="Masz już konto?"
      footerLinkText="Zaloguj się"
      footerLinkHref="/login"
      maxWidth="max-w-lg"
    >
      <RegisterForm />
    </AuthWrapper>
  );
}
