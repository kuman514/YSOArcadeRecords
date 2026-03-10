import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  type: 'text' | 'password' | 'email' | 'phone' | 'date';
}

export default function FormInput(props: Props) {
  return <input {...props} className="retro-rounded-2 px-4 py-2" />;
}
