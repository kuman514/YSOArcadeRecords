import PostListItem from '^/src/entities/post-list-item';
import { PostListItemProps } from '^/src/entities/post-list-item/props';

interface Props {
  postListItems: PostListItemProps[];
}

export default function RecentPostList({ postListItems }: Props) {
  return (
    <ul className="w-full md:w-40% flex flex-col gap-4">
      {postListItems.map((postListItem, index) => (
        <PostListItem
          key={`recent-post-list-item-${index}`}
          {...postListItem}
        />
      ))}
    </ul>
  );
}
