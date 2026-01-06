import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export default function FormDropdown(props: Props) {
  return (
    <select
      {...props}
      className="w-full retro-rounded-2 px-4 py-2 [&>option]:text-black"
    />
  );
}
