import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  type: 'submit' | 'button';
}

export default function Button(props: Props) {
  return (
    <button
      {...props}
      className="w-full retro-rounded-2 p-4 hover:bg-hovering disabled:bg-gray-300 cursor-pointer disabled:cursor-auto"
    />
  );
}
