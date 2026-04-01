import { ReactNode } from 'react';

import Footer from '^/src/shared/ui/footer';

interface Props {
  children?: ReactNode;
}

export default function SignInLayout({ children }: Props) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
