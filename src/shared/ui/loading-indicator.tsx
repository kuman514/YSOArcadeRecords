import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function LoadingIndicator({ children }: Props) {
  return (
    <main className="w-full h-full min-h-[calc(100dvh-18rem)] max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      {children}
    </main>
  );
}
