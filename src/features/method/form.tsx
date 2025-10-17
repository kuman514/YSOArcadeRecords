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

import { createMethodAction } from './create-method-action';
import { getMethodListClientSide } from './data-client';
import { deleteMethodAction } from './delete-method-action';

function MethodFormContent() {
  const { data: methodList, refetch } = useQuery({
    queryKey: ['methods'],
    queryFn: getMethodListClientSide,
  });

  const itemList = useMemo(
    () =>
      methodList?.map((method) => ({
        itemId: method.methodId,
        itemTitle: method.label,
      })) ?? [],
    [methodList]
  );

  return (
    <InfoEditor
      editorLabel="플레이 수단 편집기"
      items={itemList}
      idLabel="플레이 수단 ID"
      titleLabel="플레이 수단 이름"
      idName="methodId"
      titleName="label"
      refetch={refetch}
      createItemAction={createMethodAction}
      deleteItemAction={deleteMethodAction}
    />
  );
}

export default function MethodForm() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MethodFormContent />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
