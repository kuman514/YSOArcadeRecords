import { SearchResultProps } from '^/src/entities/search/types';
import { ReviewPost } from '^/src/entities/types/post';

export function convertReviewPostToSearchResultProps({
  title,
  subjectName,
  subjectType,
  reviewScore,
  details,
  reviewId,
  thumbnailUrl,
}: ReviewPost): Omit<SearchResultProps, 'emphasize'> {
  return {
    title,
    subheading: `${subjectType} 리뷰 - ${reviewScore}/5점`,
    description: `항목명: ${subjectName} - ${details.join(' · ')}`,
    href: `/reviews/${reviewId}`,
    thumbnailUrl,
  };
}
