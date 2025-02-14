import Link from 'next/link';

import { signOutAction } from '^/src/features/auth/sign-out-action';
import { createServerSideClient } from '^/src/shared/supabase/server';

export default async function AuthLink() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  const isSignedIn = !(error || !data?.user);

  const renderLinkArea = isSignedIn ? (
    <>
      <Link href="/create/records">새기록</Link>
      <Link href="/create/reviews">새리뷰</Link>
      <Link href="/create/gallery">새갤러리</Link>
      <form action={signOutAction}>
        <button type="submit">로그아웃</button>
      </form>
    </>
  ) : (
    <Link href="/signin">관리자 로그인</Link>
  );

  return (
    <div className="w-full h-full flex flex-row justify-center sm:justify-end items-center text-white gap-4 text-sm">
      {renderLinkArea}
    </div>
  );
}
