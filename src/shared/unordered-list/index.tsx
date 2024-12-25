import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function UnorderedList({ children }: Props) {
  return <ul className="ps-8 [&_li]:marker:content-['•_']">{children}</ul>;
}
