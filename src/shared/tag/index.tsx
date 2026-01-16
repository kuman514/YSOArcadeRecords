import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Tag({ children }: Props) {
  return (
    <div className="w-fit retro-rounded">
      <div className="text-xs px-1 py-0.5 bg-gray-300 text-red-700">
        {children}
      </div>
    </div>
  );
}
