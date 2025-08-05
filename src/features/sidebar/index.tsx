import Image from 'next/image';

import CloseSvgRepoComSvg from '^/public/icons/close-svgrepo-com.svg';

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
        <div className="w-full h-full bg-primary text-white max-w-[40rem] grid grid-rows-[4rem_1fr_4rem]">
          <div className="w-full flex flex-row justify-start items-center px-2">
            <label
              htmlFor="sidebar-open-checker"
              className="w-12 h-12 p-2 cursor-pointer"
            >
              <Image
                src={CloseSvgRepoComSvg}
                className="w-full h-full fill-white"
                alt="사이드바 닫기"
                unoptimized
              />
            </label>
          </div>
          <SidebarLinkTree />
          <div className="w-full h-full flex justify-center items-center">
            YSO as kuman514
          </div>
        </div>
      </div>
    </>
  );
}
