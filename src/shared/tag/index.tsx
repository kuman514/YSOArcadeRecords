import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Tag({ children }: Props) {
  return (
    <span
      aria-label="tag"
      className="font-mono bg-gray-300 text-red-700 text-sm px-1 py-0.5 rounded-sm"
    >
      {children}
    </span>
  );
}
