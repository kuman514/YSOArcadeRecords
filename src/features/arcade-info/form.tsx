'use client';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useActionState, useEffect, useRef, useState } from 'react';

import { InfoEditorActionState } from '^/src/entities/types/info-editor';
import FormInput from '^/src/shared/ui/form-input';

import { createArcadeInfoAction } from './create-arcade-info-action';
import { getArcadeInfoListClientSide } from './data-client';

function ArcadeInfoFormContent() {
  const arcadeIdRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLInputElement>(null);

  const [state, formAction, isLoading] = useActionState<
    InfoEditorActionState,
    FormData
  >(createArcadeInfoAction, {});

  const { data: arcadeInfoList, refetch } = useQuery({
    queryKey: ['arcade-info'],
    queryFn: getArcadeInfoListClientSide,
  });

  useEffect(() => {
    if (!isLoading && state.isSuccess) {
      refetch();
    }
  }, [isLoading, state.isSuccess, refetch]);

  function reset() {
    if (arcadeIdRef.current) {
      arcadeIdRef.current.value = '';
    }
    if (labelRef.current) {
      labelRef.current.value = '';
    }
  }

  const renderArcadeInfoList =
    arcadeInfoList?.map((arcadeInfo) => (
      <tr key={arcadeInfo.arcadeId}>
        <td>{arcadeInfo.arcadeId}</td>
        <td>{arcadeInfo.label}</td>
      </tr>
    )) ?? null;

  return (
    <section className="w-full flex flex-col gap-2">
      <h2 className="text-2xl font-bold">아케이드 부문 편집기</h2>
      <table className="w-full h-48 border border-primary overflow-y-auto block border-separate border-spacing-x-2">
        <thead className="w-full sticky top-0 left-0 bg-background">
          <tr>
            <th>아케이드 부문 ID</th>
            <th>아케이드 부문 이름</th>
          </tr>
        </thead>
        <tbody>{renderArcadeInfoList}</tbody>
      </table>
      <form
        action={formAction}
        className="w-full flex flex-col md:flex-row gap-2"
      >
        <div className="w-full flex flex-row gap-2">
          <FormInput
            ref={arcadeIdRef}
            type="text"
            id="arcadeId"
            name="arcadeId"
            placeholder="아케이드 부문 ID"
          />
          <FormInput
            ref={labelRef}
            type="text"
            id="label"
            name="label"
            placeholder="아케이드 부문 이름"
          />
        </div>
        <div className="w-full flex flex-row-reverse md:flex-row gap-2">
          <button
            disabled={isLoading}
            type="submit"
            className="w-full p-4 bg-primary hover:bg-hovering text-white rounded-sm disabled:bg-gray-300 cursor-pointer disabled:cursor-auto"
          >
            등록
          </button>
          <button
            onClick={reset}
            type="button"
            className="w-full p-4 bg-yellow-500 hover:bg-yellow-300 text-white rounded-sm disabled:bg-gray-300 cursor-pointer disabled:cursor-auto"
          >
            취소
          </button>
        </div>
      </form>
    </section>
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
