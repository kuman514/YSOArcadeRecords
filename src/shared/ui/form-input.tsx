import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type: 'text' | 'password' | 'email' | 'phone';
}

export default function FormInput(props: Props) {
  return (
    <input
      {...props}
      className="w-full px-4 py-2 border border-primary rounded text-black"
    />
  );
}
