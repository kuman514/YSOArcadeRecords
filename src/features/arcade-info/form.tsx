'use client';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import InfoEditor from '^/src/entities/info-editor';

import { createArcadeInfoAction } from './create-arcade-info-action';
import { getArcadeInfoListClientSide } from './data-client';
import { deleteArcadeInfoAction } from './delete-arcade-info-action';

function ArcadeInfoFormContent() {
  const { data: arcadeInfoList, refetch } = useQuery({
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
    <InfoEditor
      editorLabel="아케이드 부문 편집기"
      items={itemList}
      idLabel="아케이드 부문 ID"
      titleLabel="아케이드 부문 이름"
      idName="arcadeId"
      titleName="label"
      refetch={refetch}
      createItemAction={createArcadeInfoAction}
      deleteItemAction={deleteArcadeInfoAction}
    />
  );
}

export default function ArcadeInfoForm() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ArcadeInfoFormContent />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
