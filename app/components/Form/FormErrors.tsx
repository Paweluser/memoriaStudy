import { AuthErrors } from '@/types/auth';

interface FormErrorsProps {
	errors?: AuthErrors;
}

export default function FormErrors({ errors }: FormErrorsProps) {
	if (!errors || Object.keys(errors).length === 0) {
		return null;
	}

    return (
        <ul className="text-(--error-color)">
            {Object.keys(errors).map((error) => (
                <li key={error}>
                    {errors[error as keyof AuthErrors]}
                </li>
            ))}
        </ul>
    )
}
