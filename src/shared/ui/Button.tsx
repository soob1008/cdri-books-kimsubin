import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'secondary-outline';
type ButtonTypo = 'caption' | 'body2';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  type?: 'button' | 'submit';
  typography?: ButtonTypo;
  variant?: ButtonVariant;
  className?: string;
}

export default function Button({
  label,
  type = 'button',
  typography = 'caption',
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const variantClass: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    'secondary-outline':
      'border border-text-subtitle text-text-subtitle bg-white ',
  };

  const typoClasses: Record<ButtonTypo, string> = {
    caption: 't-caption',
    body2: 't-body-2',
  };

  return (
    <button
      type={type}
      className={twMerge(
        'py-4 px-7 rounded-lg disabled:opacity-50',
        variantClass[variant],
        typoClasses[typography],
        className
      )}
      {...props}
    >
      {label}
    </button>
  );
}
