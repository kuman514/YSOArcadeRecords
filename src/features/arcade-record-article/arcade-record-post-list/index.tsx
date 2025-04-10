import PostListItem from '^/src/entities/post-list-item';
import { PostListItemProps } from '^/src/entities/post-list-item/props';

interface Props {
  arcadeRecordPostListItems: PostListItemProps[];
}

export default function ArcadeRecordPostList({
  arcadeRecordPostListItems,
}: Props) {
  return (
    <ul className="w-full flex flex-col gap-4">
      {arcadeRecordPostListItems.map((arcadeRecordPostListItem, index) => (
        <PostListItem
          key={`arcade-record-post-list-item-${index}`}
          {...arcadeRecordPostListItem}
        />
      ))}
    </ul>
  );
}
