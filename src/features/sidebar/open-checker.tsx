'use client';

export default function SidebarOpenChecker() {
  return (
    <input
      type="checkbox"
      id="sidebar-open-checker"
      className="hidden [&_+_#sidebar-overlay]:hidden checked:[&_+_#sidebar-overlay]:block"
      onChange={(event) => {
        console.log(event.currentTarget.checked);
        document.body.style.overflowY = event.currentTarget.checked
          ? 'hidden'
          : 'auto';
      }}
    />
  );
}
