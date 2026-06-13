import Link from 'next/link';

import SignOutForm from '^/src/features/auth/sign-out-form';
import { createServerSideClient } from '^/src/shared/supabase/server';

import AuthLinkArea from './link-area';
import MenuDrawer from './menu-drawer';

export default async function AuthLink() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  const isSignedIn = !(error || !data?.user);

  const renderLinkArea = isSignedIn ? (
    <>
      <MenuDrawer />
      <SignOutForm />
    </>
  ) : (
    <Link href="/signin">관리자 로그인</Link>
  );

  return <AuthLinkArea>{renderLinkArea}</AuthLinkArea>;
}
