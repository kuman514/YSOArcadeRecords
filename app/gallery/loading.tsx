import Skeleton from '^/src/shared/skeleton';

export default function GalleryLoadingPage() {
  return (
    <main className="w-full h-full max-w-3xl flex flex-row flex-wrap items-start px-4 sm:px-8 py-32">
      {Array.from({ length: 9 }).map((_, index) => (
        <div className="w-1/3 aspect-square p-0.5" key={index}>
          <Skeleton width="100%" height="100%" borderRadius="0" />
        </div>
      ))}
    </main>
  );
}
