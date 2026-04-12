import Skeleton from '^/src/shared/ui/skeleton';
import LoadingIndicator from '^/src/shared/ui/loading-indicator';

export default function RecordArticleLoadingPage() {
  return (
    <LoadingIndicator>
      <Skeleton width="50%" height="2rem" borderRadius="0" />
      <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4">
        <Skeleton width="12rem" height="12rem" borderRadius="0" />
        <div className="w-1/2 flex flex-col gap-2">
          <Skeleton width="100%" height="1rem" borderRadius="0" />
          <Skeleton width="100%" height="1rem" borderRadius="0" />
          <Skeleton width="100%" height="1rem" borderRadius="0" />
          <Skeleton width="100%" height="1rem" borderRadius="0" />
          <Skeleton width="100%" height="1rem" borderRadius="0" />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton width="50%" height="2rem" borderRadius="0" />
        <Skeleton width="100%" height="12rem" borderRadius="0" />
      </div>
    </LoadingIndicator>
  );
}
