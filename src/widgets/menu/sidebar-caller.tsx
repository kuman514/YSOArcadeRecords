import StackSvgRepoComSvg from '^/public/icons/stack-svgrepo-com.svg';
import Overlay from '^/src/shared/ui/overlay';

import Sidebar from './sidebar';

export default function SidebarCaller() {
  /**
   * @desc
   * Build error happens here by this SVG component.
   */
  return (
    <Overlay overlayContent={<Sidebar />} surfaceClassName="w-12 h-12 p-2">
      <StackSvgRepoComSvg width="100%" height="100%" fill="#ffffff" />
    </Overlay>
  );
}
