import { DehydratedState } from '@tanstack/react-query';

import ExtendedReviewPostList from './extended';

interface Props {
  dehydratedState?: DehydratedState;
}

export default function ReviewPostList({ dehydratedState }: Props) {
  return (
    <ul className="w-full flex flex-col gap-4">
      <ExtendedReviewPostList dehydratedState={dehydratedState} />
    </ul>
  );
}
