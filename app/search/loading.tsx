import Skeleton from '^/src/shared/ui/skeleton';
import LoadingIndicator from '^/src/shared/ui/loading-indicator';

export default function SearchLoadingPage() {
  return (
    <LoadingIndicator>
      <Skeleton width="50%" height="2rem" borderRadius="0" />
      <div className="w-full grid grid-cols-[1fr_3fr] gap-2">
        <div className="w-full aspect-square">
          <Skeleton width="100%" height="100%" borderRadius="0" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton width="100%" height="2rem" borderRadius="0" />
          <Skeleton width="100%" height="1rem" borderRadius="0" />
          <Skeleton width="100%" height="1rem" borderRadius="0" />
          <Skeleton width="100%" height="1rem" borderRadius="0" />
        </div>
      </div>
    </LoadingIndicator>
  );
}
