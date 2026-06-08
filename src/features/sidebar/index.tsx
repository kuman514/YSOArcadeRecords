import ByKuman514Svg from '^/public/logo/by-kuman514.svg';
import YsoArcadeRecordsSvg from '^/public/logo/yso-arcade-records.svg';

import SidebarLinkTree from './link-tree';

export default function Sidebar() {
  return (
    <aside className="sticky hidden top-16 left-0 w-full h-[calc(100dvh-4rem)] bg-primary text-white md:grid grid-rows-[1fr_4rem]">
      <SidebarLinkTree />
      <div className="w-full h-full flex flex-col justify-center items-center gap-2">
        <div className="w-18/30 sm:w-18/40">
          <YsoArcadeRecordsSvg />
        </div>
        <div className="w-11/30 sm:w-11/40">
          <ByKuman514Svg />
        </div>
      </div>
    </aside>
  );
}
