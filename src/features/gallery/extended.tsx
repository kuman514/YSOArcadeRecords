'use client';

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useState } from 'react';

import Button from '^/src/shared/ui/button';

import { getExtendedGalleryList } from './data-client';
import GalleryElement from './element';

interface Props {
  dehydratedState?: DehydratedState;
}

function ExtendedGalleryContent() {
  const {
    data: rawData,
    isFetching,
    hasNextPage: isHaveNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['gallery'],
    queryFn: async ({ pageParam }) => await getExtendedGalleryList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const isNextPageButtonDisabled = !isHaveNextPage || isFetching;

  const nextPageLabel = (() => {
    if (!isHaveNextPage) {
      return '마지막 페이지';
    }

    if (isFetching) {
      return '불러오는 중';
    }

    return '더보기';
  })();

  const data = rawData?.pages.map((page) => page.content);
  const renderData = data?.map((page, i) =>
    page.map((post, j) => (
      <GalleryElement key={`gallery-element-${i}-${j}`} post={post} />
    ))
  );

  return (
    <>
      {renderData}
      <Button
        type="button"
        onClick={() => {
          fetchNextPage();
        }}
        disabled={isNextPageButtonDisabled}
      >
        {nextPageLabel}
      </Button>
    </>
  );
}

export default function ExtendedGallery({ dehydratedState }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <ExtendedGalleryContent />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
