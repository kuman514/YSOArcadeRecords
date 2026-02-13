'use client';

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';

import ReviewPostListContent from './list-content';

interface Props {
  dehydratedState?: DehydratedState;
}

export default function ReviewPostList({ dehydratedState }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ul className="w-full flex flex-col gap-4">
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <ReviewPostListContent />
        </HydrationBoundary>
      </QueryClientProvider>
    </ul>
  );
}
