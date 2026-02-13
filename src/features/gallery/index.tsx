import { DehydratedState } from '@tanstack/react-query';

import ExtendedGallery from './extended';

interface Props {
  dehydratedState?: DehydratedState;
}

export default function GalleryPostList({ dehydratedState }: Props) {
  return (
    <section className="w-full h-full flex flex-row flex-wrap gap-x-[calc(100%/44)] justify-start items-start">
      <ExtendedGallery dehydratedState={dehydratedState} />
    </section>
  );
}
