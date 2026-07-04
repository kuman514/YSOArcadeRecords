import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  type: 'text' | 'password' | 'email' | 'phone' | 'date';
  additionalClassName?: string;
}

export default function FormInput({ additionalClassName, ...props }: Props) {
  return (
    <input
      {...props}
      className={`retro-rounded-2 px-4 py-2 ${additionalClassName}`}
    />
  );
}
