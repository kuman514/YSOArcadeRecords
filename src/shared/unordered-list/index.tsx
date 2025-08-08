import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function UnorderedList({ children }: Props) {
  return <ul className="ps-8 list-disc">{children}</ul>;
}
