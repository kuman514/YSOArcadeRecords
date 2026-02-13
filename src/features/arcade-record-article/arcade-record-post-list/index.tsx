import { DehydratedState } from '@tanstack/react-query';

import { ITEMS_PER_PAGE } from '^/src/entities/constants/pagenation';
import PostListItem from '^/src/entities/post-list-item';
import { PostListItemProps } from '^/src/entities/post-list-item/props';

import ExtendedArcadeRecordPostList from './extended';

interface Props {
  arcadeRecordPostListItems: PostListItemProps[];
  dehydratedState?: DehydratedState;
}

export default function ArcadeRecordPostList({
  arcadeRecordPostListItems,
  dehydratedState,
}: Props) {
  return (
    <ul className="w-full flex flex-col gap-4">
      {arcadeRecordPostListItems.map((arcadeRecordPostListItem, index) => (
        <PostListItem
          key={`arcade-record-post-list-item-${index}`}
          {...arcadeRecordPostListItem}
        />
      ))}
      <ExtendedArcadeRecordPostList
        isEnabled={arcadeRecordPostListItems.length === ITEMS_PER_PAGE}
        dehydratedState={dehydratedState}
      />
    </ul>
  );
}
