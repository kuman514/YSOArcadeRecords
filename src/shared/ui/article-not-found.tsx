import NotFoundSvg from '^/public/status/not-found.svg';

interface Props {
  message: string;
}

export default function ArticleNotFoundIndicator({ message }: Props) {
  return (
    <main className="w-full h-[calc(100dvh-18rem)] max-w-3xl flex flex-col items-center px-4 sm:px-8 py-32 gap-12 sm:gap-16">
      <div className="w-full">
        <NotFoundSvg width="100%" />
      </div>
      <h1 className="text-4xl font-bold text-center">{message}</h1>
    </main>
  );
}
