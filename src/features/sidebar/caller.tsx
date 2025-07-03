import Image from 'next/image';

import StackSvgRepoComSvg from '^/public/icons/stack-svgrepo-com.svg';

export default function SidebarCaller() {
  return (
    <label
      htmlFor="sidebar-open-checker"
      className="w-12 h-12 p-2 cursor-pointer"
    >
      <Image
        src={StackSvgRepoComSvg}
        className="w-full h-full fill-white"
        alt="사이드바 열기"
      />
    </label>
  );
}
