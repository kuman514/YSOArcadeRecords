import { ReactNode } from 'react';

import Footer from '^/src/shared/ui/footer';

interface Props {
  children?: ReactNode;
}

export default function ReviewLayout({ children }: Props) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
