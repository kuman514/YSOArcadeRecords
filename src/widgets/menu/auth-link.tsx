import Link from 'next/link';

import SignOutForm from '^/src/features/auth/sign-out-form';
import { createServerSideClient } from '^/src/shared/supabase/server';
import KeySkeletonSvgRepoComSvg from '^/public/icons/key-skeleton-svgrepo-com.svg';

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
    <Link
      href="/signin"
      className="w-16 h-16 flex flex-row justify-center items-center"
    >
      <KeySkeletonSvgRepoComSvg width="1.6rem" height="1.6rem" />
    </Link>
  );

  return <AuthLinkArea>{renderLinkArea}</AuthLinkArea>;
}
