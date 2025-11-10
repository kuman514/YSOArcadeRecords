import CloseSvgRepoComSvg from '^/public/icons/close-svgrepo-com.svg';
import AuthLink from '^/src/widgets/menu/auth-link';
import YsoArcadeRecordsSvg from '^/public/logo/yso-arcade-records.svg';
import ByKuman514Svg from '^/public/logo/by-kuman514.svg';

import SidebarLinkTree from './link-tree';
import SidebarOpenChecker from './open-checker';

export default function Sidebar() {
  return (
    <>
      <SidebarOpenChecker />
      <div
        id="sidebar-overlay"
        className="fixed left-0 top-0 w-screen h-dvh bg-[rgba(0,0,0,0.4)] z-50 touch-none"
      >
        <aside className="w-full h-full bg-primary text-white max-w-160 grid grid-rows-[4rem_1fr_4rem]">
          <div className="w-full h-full flex flex-row">
            <label
              htmlFor="sidebar-open-checker"
              className="w-16 h-full p-4 cursor-pointer"
            >
              <CloseSvgRepoComSvg width="100%" height="100%" />
            </label>
            <AuthLink />
          </div>
          <SidebarLinkTree />
          <footer className="w-full h-full flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0">
            <div className="w-18/30 sm:w-18/40">
              <YsoArcadeRecordsSvg />
            </div>
            <div className="hidden w-1/30 sm:block sm:w-1/40"></div>
            <div className="w-11/30 sm:w-11/40">
              <ByKuman514Svg />
            </div>
          </footer>
        </aside>
      </div>
    </>
  );
}
