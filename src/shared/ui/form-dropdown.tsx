import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export default function FormDropdown(props: Props) {
  return (
    <select
      {...props}
      className="w-full retro-rounded-2 h-12 px-4 [&>option]:text-black"
    />
  );
}
