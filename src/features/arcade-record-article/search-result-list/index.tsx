'use client';

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';

import RecordSearchResultListContent from './content';

interface Props {
  dehydratedState?: DehydratedState;
}

export default function RecordSearchResultList({ dehydratedState }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ul className="w-full flex flex-col gap-4">
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <RecordSearchResultListContent />
        </HydrationBoundary>
      </QueryClientProvider>
    </ul>
  );
}
