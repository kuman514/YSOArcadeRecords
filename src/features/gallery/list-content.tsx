'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import Container from '^/src/shared/ui/container';

import { getExtendedGalleryList } from './data-client';
import GalleryElement from './element';

export default function GalleryPostListContent() {
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

  useEffect(() => {
    function handleOnScroll() {
      const isScrollSufficient =
        window.innerHeight + window.scrollY + 40 >= document.body.offsetHeight;
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

  const data = rawData?.pages.map((page) => page.content);
  const renderData = data?.map((page, i) =>
    page.map((post, j) => (
      <GalleryElement key={`gallery-element-${i}-${j}`} post={post} />
    ))
  );

  return (
    <>
      {renderData}
      <Container className="w-full text-center">{nextPageLabel}</Container>
    </>
  );
}
