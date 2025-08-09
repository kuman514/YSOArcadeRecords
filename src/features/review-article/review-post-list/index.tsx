import { ITEMS_PER_PAGE } from '^/src/entities/constants/pagenation';
import PostListItem from '^/src/entities/post-list-item';
import { PostListItemProps } from '^/src/entities/post-list-item/props';

import ExtendedReviewPostList from './extended';

interface Props {
  reviewPostListItems: PostListItemProps[];
}

export default function ReviewPostList({ reviewPostListItems }: Props) {
  return (
    <ul className="w-full flex flex-col gap-4">
      {reviewPostListItems.map((reviewPostListItem, index) => (
        <PostListItem
          key={`review-post-list-item-${index}`}
          {...reviewPostListItem}
        />
      ))}
      <ExtendedReviewPostList
        isEnabled={reviewPostListItems.length === ITEMS_PER_PAGE}
      />
    </ul>
  );
}
