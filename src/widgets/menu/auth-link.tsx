import Link from 'next/link';

import SignOutForm from '^/src/features/auth/sign-out-form';
import { createServerSideClient } from '^/src/shared/supabase/server';

import AuthLinkArea from './link-area';

export default async function AuthLink() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  const isSignedIn = !(error || !data?.user);

  const renderLinkArea = isSignedIn ? (
    <>
      <Link href="/editor">정보편집</Link>
      <Link href="/create/records">새기록</Link>
      <Link href="/create/reviews">새리뷰</Link>
      <Link href="/create/gallery">새갤러리</Link>
      <SignOutForm />
    </>
  ) : (
    <Link href="/signin">관리자 로그인</Link>
  );

  return <AuthLinkArea>{renderLinkArea}</AuthLinkArea>;
}
