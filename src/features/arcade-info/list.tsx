'use client';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import InfoList from '^/src/entities/info-list';
import { getArcadeInfoListClientSide } from './data-client';

function ArcadeInfoListContent() {
  const { data: arcadeInfoList } = useQuery({
    queryKey: ['arcade-info'],
    queryFn: getArcadeInfoListClientSide,
  });

  const itemList = useMemo(
    () =>
      arcadeInfoList?.map((arcadeInfo) => ({
        itemId: arcadeInfo.arcadeId,
        itemTitle: arcadeInfo.label,
      })) ?? [],
    [arcadeInfoList]
  );

  return (
    <InfoList items={itemList} type="arcade-info" label="아케이드 부문 목록" />
  );
}

export default function ArcadeInfoList() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ArcadeInfoListContent />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
