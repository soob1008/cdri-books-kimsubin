import type { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
}

export default function Input({
  placeholder = '텍스트를 입력하세요',
  className,
  ...props
}: InputProps) {
  return (
    <input
      placeholder={placeholder}
      className={twMerge(
        'h-9 px-2 text-sm focus:outline-nonebg-white border-b border-[#D2D6DA] focus:outline-none focus:border-b-primary placeholder:text-text-subtitle',
        className
      )}
      {...props}
    />
  );
}
