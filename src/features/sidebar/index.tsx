import SidebarLinkTree from './link-tree';

export default function Sidebar() {
  return (
    <div className="w-full h-full bg-primary text-white max-w-[40rem] grid grid-rows-[4rem_1fr_4rem]">
      <div />
      <SidebarLinkTree />
      <div className="w-full h-full flex justify-center items-center">
        YSO as kuman514
      </div>
    </div>
  );
}
