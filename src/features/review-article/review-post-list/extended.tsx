'use client';

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useState } from 'react';

import PostListItem from '^/src/entities/post-list-item';
import Button from '^/src/shared/ui/button';

import { getExtendedReviewPostList } from './data-client';
import { convertReviewPostToPostListItem } from './util';

interface Props {
  dehydratedState?: DehydratedState;
}

function ExtendedReviewPostListContent() {
  const {
    data: rawData,
    isFetching,
    hasNextPage: isHaveNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['reviews'],
    queryFn: async ({ pageParam }) =>
      await getExtendedReviewPostList(pageParam),
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
    page.content.map(convertReviewPostToPostListItem)
  );
  const renderData = data?.map((page, i) =>
    page.map((postListItem, j) => (
      <PostListItem key={`review-post-list-item-${i}-${j}`} {...postListItem} />
    ))
  );

  return (
    <>
      {renderData}
      <li>
        <Button
          type="button"
          className="w-full p-4 bg-primary hover:bg-hovering text-white rounded-sm disabled:bg-gray-300 cursor-pointer disabled:cursor-auto"
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

export default function ExtendedReviewPostList({ dehydratedState }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <ExtendedReviewPostListContent />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
