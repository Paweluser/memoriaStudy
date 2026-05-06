import { UseFormRegister, FieldError, FieldValues, Path } from 'react-hook-form';

type InputFieldProps<T extends FieldValues> = {
    label: string;
    name: Path<T>; 
    register: UseFormRegister<T>;
    error?: FieldError;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    className?: string;
};

export default function InputForm<T extends FieldValues>({
    label,
    name,
    register,
    error,
    type = 'text',
    placeholder,
    className = ''
}: InputFieldProps<T>) {
    return (
        <div className={className}>
            <label className="block text-sm font-medium mb-1">
                {label}
            </label>
            <input
                type={type}
                {...register(name)}
                placeholder={placeholder}
                className="w-full border rounded-md p-2"
            />
            {error && (
                <p className="text-(--error-color) text-sm mt-1">
                    {error.message}
                </p>
            )}
        </div>
    );
}