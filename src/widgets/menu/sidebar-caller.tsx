import OpenSidebarIcon from '^/src/widgets/menu/open-sidebar-icon';
import Overlay from '^/src/shared/ui/overlay';

import Sidebar from './sidebar';

export default function SidebarCaller() {
  return (
    <Overlay overlayContent={<Sidebar />} surfaceClassName="w-12 h-12 p-2">
      <OpenSidebarIcon />
    </Overlay>
  );
}
