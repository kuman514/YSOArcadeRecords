'use client';

export default function SidebarOpenChecker() {
  return (
    <input
      type="checkbox"
      id="sidebar-open-checker"
      className="hidden [&+#sidebar-overlay]:hidden checked:[&+#sidebar-overlay]:block"
      onChange={(event) => {
        console.log(event.currentTarget.checked);
        document.body.style.overflowY = event.currentTarget.checked
          ? 'hidden'
          : 'auto';
      }}
    />
  );
}
