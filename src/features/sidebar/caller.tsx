import StackSvgRepoComSvg from '^/public/icons/stack-svgrepo-com.svg';

export default function SidebarCaller() {
  return (
    <label
      htmlFor="sidebar-open-checker"
      className="w-12 h-12 p-2 cursor-pointer"
    >
      <StackSvgRepoComSvg width="100%" height="100%" />
    </label>
  );
}
