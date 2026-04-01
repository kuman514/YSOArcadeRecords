import Skeleton from '^/src/shared/skeleton';
import LoadingIndicator from '^/src/shared/ui/loading-indicator';

export default function ReviewLoadingPage() {
  return (
    <LoadingIndicator>
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
    </LoadingIndicator>
  );
}
