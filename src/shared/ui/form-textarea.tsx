import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  type: 'text' | 'password' | 'email' | 'phone';
}

export default function FormTextArea(props: Props) {
  return (
    <textarea
      {...props}
      className="w-full h-40 px-4 py-2 border border-primary rounded-sm bg-white text-black"
    />
  );
}
