import CloseSvgRepoComSvg from '^/public/icons/close-svgrepo-com.svg';
import Sidebar from '^/src/features/sidebar';

import SidebarOpenChecker from './open-checker';
import TitleLink from './title-link';

export default function SideDrawer() {
  return (
    <>
      <SidebarOpenChecker />
      <div
        id="side-drawer-overlay"
        className="fixed left-0 top-0 w-screen h-dvh bg-[rgba(0,0,0,0.4)] z-50 touch-none"
      ></div>
      <aside
        id="side-drawer-content"
        className="fixed left-0 top-0 w-full h-dvh z-51 bg-primary text-white max-w-72 grid grid-rows-[4rem_1fr]"
      >
        <div className="w-full h-full flex flex-row items-center">
          <label
            htmlFor="side-drawer-open-checker"
            className="w-16 h-full p-4 cursor-pointer"
          >
            <CloseSvgRepoComSvg width="100%" height="100%" />
          </label>
          <TitleLink />
        </div>
        <Sidebar />
      </aside>
    </>
  );
}
