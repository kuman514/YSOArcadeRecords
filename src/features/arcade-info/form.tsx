'use client';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useActionState, useEffect, useRef, useState } from 'react';

import { InfoEditorActionState } from '^/src/entities/info-editor/types';
import FormInput from '^/src/shared/ui/form-input';

import { toast } from 'react-toastify';
import { createArcadeInfoAction } from './create-arcade-info-action';
import { getArcadeInfoListClientSide } from './data-client';
import { deleteArcadeInfoAction } from './delete-arcade-info-action';

function ArcadeInfoFormContent() {
  const arcadeIdRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLInputElement>(null);

  const [createState, createFormAction, isCreateLoading] = useActionState<
    InfoEditorActionState,
    FormData
  >(createArcadeInfoAction, {});

  const [deleteState, deleteFormAction, isDeleteLoading] = useActionState<
    InfoEditorActionState,
    FormData
  >(deleteArcadeInfoAction, {});

  const { data: arcadeInfoList, refetch } = useQuery({
    queryKey: ['arcade-info'],
    queryFn: getArcadeInfoListClientSide,
  });

  useEffect(() => {
    if (!isCreateLoading && createState.isSuccess) {
      refetch();
    }
  }, [isCreateLoading, createState.isSuccess, refetch]);

  useEffect(() => {
    if (!isCreateLoading && createState.errorMessage) {
      toast(createState.errorMessage, { type: 'error' });
    }
  }, [isCreateLoading, createState.errorMessage]);

  useEffect(() => {
    if (!isDeleteLoading && deleteState.isSuccess) {
      refetch();
    }
  }, [isDeleteLoading, deleteState.isSuccess, refetch]);

  useEffect(() => {
    if (!isDeleteLoading && deleteState.errorMessage) {
      toast(deleteState.errorMessage, { type: 'error' });
    }
  }, [isDeleteLoading, deleteState.errorMessage]);

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
        <td>
          <form action={deleteFormAction}>
            <input name="arcadeId" type="hidden" value={arcadeInfo.arcadeId} />
            <button type="submit" className="cursor-pointer">
              X
            </button>
          </form>
        </td>
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
            <th></th>
            <th>아케이드 부문 ID</th>
            <th>아케이드 부문 이름</th>
          </tr>
        </thead>
        <tbody>{renderArcadeInfoList}</tbody>
      </table>
      <form
        action={createFormAction}
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
            disabled={isCreateLoading}
            type="submit"
            className="w-full p-4 bg-primary hover:bg-hovering text-white rounded-sm disabled:bg-gray-300 cursor-pointer disabled:cursor-auto"
          >
            등록
          </button>
          <button
            disabled={isCreateLoading}
            onClick={reset}
            type="button"
            className="w-full p-4 bg-yellow-500 hover:bg-yellow-300 text-white rounded-sm disabled:bg-gray-300 cursor-pointer disabled:cursor-auto"
          >
            비우기
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
