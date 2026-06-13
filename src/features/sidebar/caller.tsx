import StackSvgRepoComSvg from '^/public/icons/stack-svgrepo-com.svg';

export default function SidebarCaller() {
  return (
    <label
      htmlFor="sidebar-open-checker"
      className="w-16 h-16 flex flex-col justify-center items-center cursor-pointer"
    >
      <StackSvgRepoComSvg width="2rem" height="2rem" />
    </label>
  );
}
