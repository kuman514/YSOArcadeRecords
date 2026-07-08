import Link from 'next/link';

import SignOutForm from '^/src/features/auth/sign-out-form';
import { createServerSideClient } from '^/src/shared/supabase/server';
import KeySkeletonSvgRepoComSvg from '^/public/icons/key-skeleton-svgrepo-com.svg';
import SidebarCaller from '^/src/features/sidebar/caller';
import { IS_PRODUCTION } from '^/src/shared/util/is-production';
import SearchBar from '^/src/features/search';

import AuthLinkArea from './link-area';
import MenuDrawer from './menu-drawer';

export default async function Header() {
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
      <KeySkeletonSvgRepoComSvg width="1.55rem" height="1.55rem" />
    </Link>
  );

  return (
    <header className="sticky top-0 left-0 w-full h-16 grid grid-cols-[4rem_1fr] pr-4 bg-primary z-50">
      <SidebarCaller />
      <div
        className={`w-full h-full grid ${isSignedIn ? 'grid-cols-[1fr_8rem]' : 'grid-cols-[7rem_1fr_4rem]'} sm:grid-cols-[8rem_1fr_8rem]`}
      >
        <div
          className={`w-full ${isSignedIn ? 'hidden sm:flex' : 'flex'} flex-col justify-center items-start`}
        >
          <Link href="/" className="text-white">
            {IS_PRODUCTION ? 'YSOArcadeRecords' : 'DEV YSOARs'}
          </Link>
        </div>
        <div className="w-full flex flex-row justify-center items-center">
          <SearchBar />
        </div>
        <div className="w-full flex flex-row justify-end items-center">
          <AuthLinkArea>{renderLinkArea}</AuthLinkArea>
        </div>
      </div>
    </header>
  );
}
