import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { INFINITE_SCROLL_OFFSET } from '^/src/shared/util/constants';
import SearchResult from '^/src/entities/search/search-result';
import Container from '^/src/shared/ui/container';
import { getExtendedReviewPostList } from '^/src/features/review-article/review-post-list/data-client';

import { convertReviewPostToSearchResultProps } from './util';

export default function ReviewSearchResultListContent() {
  const searchParams = useSearchParams();
  const searchText = searchParams.get('searchText') ?? '';

  const {
    data: rawData,
    isFetching,
    hasNextPage: isHaveNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['search', 'reviews', searchText],
    queryFn: async ({ pageParam }) =>
      await getExtendedReviewPostList(pageParam, { searchText }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const isNextPageButtonDisabled = !isHaveNextPage || isFetching;

  useEffect(() => {
    function handleOnScroll() {
      const isScrollSufficient =
        window.innerHeight + window.scrollY + INFINITE_SCROLL_OFFSET >=
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

  const data = rawData?.pages.map((page) => page.content);
  const renderData = data?.map((page) =>
    page.map((post) => {
      const props = convertReviewPostToSearchResultProps(post);
      return (
        <SearchResult
          key={post.reviewId}
          {...props}
          emphasize={searchText ?? ''}
        />
      );
    })
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
