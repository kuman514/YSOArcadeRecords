'use client';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import PostListItem from '^/src/entities/post-list-item';

import { getExtendedArcadeRecordPostList } from './data-client';
import { convertArcadeRecordPostToPostListItem } from './util';

interface Props {
  isEnabled: boolean;
}

function ExtendedArcadeRecordPostListContent({ isEnabled }: Props) {
  const pathName = usePathname();
  const paths = pathName?.split('/').filter((path) => path.length > 0) ?? [
    'records',
  ];
  const arcadeId = paths[1];

  const {
    data: rawData,
    isFetching,
    hasNextPage: isHaveNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: arcadeId ? ['arcade-records', arcadeId] : ['arcade-records'],
    queryFn: async ({ pageParam }) =>
      await getExtendedArcadeRecordPostList(pageParam, arcadeId),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: isEnabled,
  });

  const isNextPageButtonDisabled = !isEnabled || !isHaveNextPage || isFetching;

  const nextPageLabel = (() => {
    if (!isEnabled || !isHaveNextPage) {
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
        <button
          type="button"
          className="w-full p-4 bg-primary hover:bg-hovering text-white rounded-sm disabled:bg-gray-300 cursor-pointer disabled:cursor-auto"
          onClick={() => {
            fetchNextPage();
          }}
          disabled={isNextPageButtonDisabled}
        >
          {nextPageLabel}
        </button>
      </li>
    </>
  );
}

export default function ExtendedArcadeRecordPostList({ isEnabled }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ExtendedArcadeRecordPostListContent isEnabled={isEnabled} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
