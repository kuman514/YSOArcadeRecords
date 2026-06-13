import ByKuman514Svg from '^/public/logo/by-kuman514.svg';
import YsoArcadeRecordsSvg from '^/public/logo/yso-arcade-records.svg';

import SidebarLinkTree from './link-tree';

export default function Sidebar() {
  return (
    <>
      <SidebarLinkTree />
      <div className="w-full h-full flex flex-col justify-center items-center gap-2">
        <div className="w-18/30 sm:w-18/40">
          <YsoArcadeRecordsSvg />
        </div>
        <div className="w-11/30 sm:w-11/40">
          <ByKuman514Svg />
        </div>
      </div>
    </>
  );
}
