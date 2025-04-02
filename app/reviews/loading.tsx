import Skeleton from '^/src/shared/skeleton';

export default function ReviewListLoadingPage() {
  return (
    <main className="w-full h-full max-w-3xl flex flex-col items-start px-4 sm:px-8 py-32 gap-8">
      <Skeleton width="50%" height="2rem" borderRadius="0" />
      <div className="w-full flex flex-col gap-2">
        <Skeleton width="100%" height="12rem" borderRadius="0" />
        <Skeleton width="50%" height="2rem" borderRadius="0" />
        <Skeleton width="25%" height="1rem" borderRadius="0" />
        <Skeleton width="25%" height="1rem" borderRadius="0" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton width="100%" height="12rem" borderRadius="0" />
        <Skeleton width="50%" height="2rem" borderRadius="0" />
        <Skeleton width="25%" height="1rem" borderRadius="0" />
        <Skeleton width="25%" height="1rem" borderRadius="0" />
      </div>
    </main>
  );
}
