'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import PostListItem from '^/src/entities/post-list-item';
import Container from '^/src/shared/ui/container';
import { INFINITE_SCROLL_AMOUNT } from '^/src/shared/util/constants';

import { getExtendedArcadeRecordPostList } from './data-client';
import { convertArcadeRecordPostToPostListItem } from './util';

export function ArcadeRecordPostListContent() {
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

  useEffect(() => {
    function handleOnScroll() {
      const isScrollSufficient =
        window.innerHeight + window.scrollY + INFINITE_SCROLL_AMOUNT >=
        document.body.offsetHeight;
      if (isScrollSufficient && !isNextPageButtonDisabled) {
        fetchNextPage();
      }
    }

    window.addEventListener('scroll', handleOnScroll);
    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, [isNextPageButtonDisabled]);

  const nextPageLabel = (() => {
    if (!isHaveNextPage) {
      return '모두 불러옴';
    }

    if (isFetching) {
      return '불러오는 중';
    }

    return '스크롤하여 더보기';
  })();

  const data = rawData?.pages.map((page) =>
    page.content.map(convertArcadeRecordPostToPostListItem)
  );
  const renderData = data?.map((page, i) =>
    page.map((postListItem, j) => (
      <PostListItem key={postListItem.id} {...postListItem} />
    ))
  );

  return (
    <>
      {renderData}
      <li>
        <Container className="text-center">{nextPageLabel}</Container>
      </li>
    </>
  );
}
