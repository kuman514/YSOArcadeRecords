import Footer from '^/src/shared/ui/footer';

import SidebarLinkTree from './link-tree';

export default function Sidebar() {
  return (
    <div className="overflow-y-auto w-full h-full flex flex-col gap-16 justify-between">
      <SidebarLinkTree />
      <Footer />
    </div>
  );
}
