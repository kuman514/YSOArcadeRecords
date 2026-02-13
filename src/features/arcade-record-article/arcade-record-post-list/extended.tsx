'use client';

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import PostListItem from '^/src/entities/post-list-item';
import Button from '^/src/shared/ui/button';

import { getExtendedArcadeRecordPostList } from './data-client';
import { convertArcadeRecordPostToPostListItem } from './util';

interface Props {
  dehydratedState?: DehydratedState;
}

function ExtendedArcadeRecordPostListContent() {
  const searchParams = useSearchParams();
  const arcadeId = searchParams.get('arcadeId') ?? undefined;

  const {
    data: rawData,
    isFetching,
    hasNextPage: isHaveNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: arcadeId ? ['arcade-records', arcadeId] : ['arcade-records'],
    queryFn: async ({ pageParam }) =>
      await getExtendedArcadeRecordPostList(pageParam, arcadeId),
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

  const data = rawData?.pages.map((page) =>
    page.content.map(convertArcadeRecordPostToPostListItem)
  );
  const renderData = data?.map((page, i) =>
    page.map((postListItem, j) => (
      <PostListItem
        key={`arcade-record-post-list-item-${i}-${j}`}
        {...postListItem}
      />
    ))
  );

  return (
    <>
      {renderData}
      <li>
        <Button
          type="button"
          onClick={() => {
            fetchNextPage();
          }}
          disabled={isNextPageButtonDisabled}
        >
          {nextPageLabel}
        </Button>
      </li>
    </>
  );
}

export default function ExtendedArcadeRecordPostList({
  dehydratedState,
}: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <ExtendedArcadeRecordPostListContent />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
