import { DehydratedState } from '@tanstack/react-query';

import ExtendedArcadeRecordPostList from './extended';

interface Props {
  dehydratedState?: DehydratedState;
}

export default function ArcadeRecordPostList({ dehydratedState }: Props) {
  return (
    <ul className="w-full flex flex-col gap-4">
      <ExtendedArcadeRecordPostList dehydratedState={dehydratedState} />
    </ul>
  );
}
