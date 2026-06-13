import Link from 'next/link';

import CloseSvgRepoComSvg from '^/public/icons/close-svgrepo-com.svg';
import Sidebar from '^/src/features/sidebar';
import { IS_PRODUCTION } from '^/src/shared/util/is-production';

import SidebarOpenChecker from './open-checker';

export default function SideDrawer() {
  return (
    <>
      <SidebarOpenChecker />
      <div
        id="side-drawer-overlay"
        className="fixed left-0 top-0 w-screen h-dvh bg-[rgba(0,0,0,0.4)] z-50 touch-none"
      >
        <aside className="w-full h-full bg-primary text-white max-w-72 grid grid-rows-[4rem_1fr_4rem]">
          <div className="w-full h-full flex flex-row items-center">
            <label
              htmlFor="side-drawer-open-checker"
              className="w-16 h-full p-4 cursor-pointer"
            >
              <CloseSvgRepoComSvg width="100%" height="100%" />
            </label>
            <Link href="/" className="text-white">
              {IS_PRODUCTION ? 'YSOArcadeRecords' : 'DEV YSOARs'}
            </Link>
          </div>
          <Sidebar />
        </aside>
      </div>
    </>
  );
}
