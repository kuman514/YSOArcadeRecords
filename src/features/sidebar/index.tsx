import CloseSvgRepoComSvg from '^/public/icons/close-svgrepo-com.svg';

import SidebarLinkTree from './link-tree';
import SidebarOpenChecker from './open-checker';
import AuthLink from '^/src/widgets/menu/auth-link';

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
          <footer className="w-full h-full flex justify-center items-center">
            YSO as kuman514
          </footer>
        </aside>
      </div>
    </>
  );
}
