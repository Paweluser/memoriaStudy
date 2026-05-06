'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export default function AppButton({
    children,
    type = 'button',
    className = '',
    ...props
}: AppButtonProps) {
    return (
        <button
            type={type}
            className={`px-8 py-3 rounded-lg transition-colors duration-300 font-medium cursor-pointer bg-(--second-color) text-(--main-color) hover:bg-(--accent-color) ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
