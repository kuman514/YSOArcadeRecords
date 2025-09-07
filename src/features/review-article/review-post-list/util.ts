import { ReviewPost, ReviewPostDBColumn } from '^/src/entities/types/post';

export function convertReviewPostDBColumnToReviewPost({
  id,
  review_id,
  title,
  tags,
  subject_name,
  subject_type,
  created_by,
  release_date,
  details,
  key_features,
  expectations,
  first_impressions,
  positives,
  negatives,
  conclusions,
  review_score,
  youtube_id,
  thumbnail_url,
  image_urls,
  created_at,
  modified_at,
}: ReviewPostDBColumn): ReviewPost {
  return {
    postId: id,
    reviewId: review_id,
    title,
    tags,
    subjectName: subject_name,
    subjectType: subject_type,
    createdBy: created_by,
    releaseDate: new Date(release_date),
    details: [
      ...details,
      ...key_features,
      ...expectations,
      ...first_impressions,
      ...positives,
      ...negatives,
      ...conclusions,
    ],
    reviewScore: review_score,
    youTubeId: youtube_id,
    thumbnailUrl: thumbnail_url,
    imageUrls: image_urls,
    createdAt: new Date(created_at),
    modifiedAt: new Date(modified_at),
  };
}

export function convertReviewPostToPostListItem({
  title,
  subjectType,
  subjectName,
  createdAt,
  tags,
  youTubeId,
  reviewId,
  thumbnailUrl,
}: ReviewPost) {
  return {
    title: title,
    memo: `${subjectType} - ${subjectName} 리뷰`,
    dateToDisplay: createdAt,
    tags: tags,
    isHaveYouTube: Boolean(youTubeId),
    href: `/reviews/${reviewId}`,
    thumbnailUrl: thumbnailUrl,
  };
}
