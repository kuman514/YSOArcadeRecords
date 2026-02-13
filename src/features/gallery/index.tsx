'use client';

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';

import GalleryPostListContent from './list-content';

interface Props {
  dehydratedState?: DehydratedState;
}

export default function GalleryPostList({ dehydratedState }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <section className="w-full h-full flex flex-row flex-wrap gap-x-[calc(100%/44)] justify-start items-start">
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <GalleryPostListContent />
        </HydrationBoundary>
      </QueryClientProvider>
    </section>
  );
}
