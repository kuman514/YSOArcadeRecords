import LoadingSvg from '^/public/icons/loading.svg';

import './globals.css';

export default async function RootLoadingIndicator() {
  return (
    <section className="fixed left-0 top-0 w-screen h-dvh bg-background z-50 touch-none flex flex-col justify-center items-center sm:text-4xl">
      <div className="animate-spin fill-hovering">
        <LoadingSvg fill="interit" />
      </div>
      <h1>로딩중</h1>
    </section>
  );
}
