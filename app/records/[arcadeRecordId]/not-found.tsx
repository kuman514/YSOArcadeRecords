import NotFoundSvg from '^/public/status/not-found.svg';

export default function ArcadeRecordArticleNotFoundPage() {
  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-center px-4 sm:px-8 py-32 gap-12 sm:gap-16">
      <div className="w-full">
        <NotFoundSvg width="100%" />
      </div>
      <h1 className="text-4xl font-bold text-center">기록이 없습니다.</h1>
    </main>
  );
}

