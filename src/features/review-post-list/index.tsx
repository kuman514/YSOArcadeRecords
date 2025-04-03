import PostListItem from '^/src/entities/post-list-item';
import { PostListItemProps } from '^/src/entities/post-list-item/props';

interface Props {
  reviewPostListItems: PostListItemProps[];
}

export default function ReviewPostList({ reviewPostListItems }: Props) {
  return (
    <ul className="w-full flex flex-col gap-4">
      {reviewPostListItems.map((reviewPostListItem, index) => (
        <PostListItem
          key={`arcade-record-post-list-item-${index}`}
          {...reviewPostListItem}
        />
      ))}
    </ul>
  );
}
