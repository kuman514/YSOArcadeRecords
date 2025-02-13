'use client';

import dynamic from 'next/dynamic';

const StackSvgRepoComSvg = dynamic(
  () => import('^/public/icons/stack-svgrepo-com.svg'),
  { ssr: false }
);

export default function OpenSidebarIcon() {
  return (
    <div className="fill-white w-full h-full">
      <StackSvgRepoComSvg />
    </div>
  );
}
