import Link from 'next/link';

import SidebarCaller from '^/src/features/sidebar/caller';
import { IS_PRODUCTION } from '^/src/shared/util/is-production';
import AuthLink from '^/src/widgets/menu/auth-link';

export default function Header() {
  return (
    <header className="sticky top-0 left-0 w-full h-16 grid grid-cols-[4rem_1fr] pr-6 bg-primary z-50">
      <SidebarCaller />
      <div className="w-full h-full flex flex-row items-center justify-between">
        <Link href="/" className="text-white">
          {IS_PRODUCTION ? 'YSOArcadeRecords' : 'DEV YSOARs'}
        </Link>
        <AuthLink />
      </div>
    </header>
  );
}
