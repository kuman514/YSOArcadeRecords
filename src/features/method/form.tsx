'use client';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useActionState, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { InfoEditorActionState } from '^/src/entities/types/info-editor';
import FormInput from '^/src/shared/ui/form-input';

import { createMethodAction } from './create-method-action';
import { getMethodListClientSide } from './data-client';
import { deleteMethodAction } from './delete-method-action';

function MethodFormContent() {
  const methodIdRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLInputElement>(null);

  const [createState, createFormAction, isCreateLoading] = useActionState<
    InfoEditorActionState,
    FormData
  >(createMethodAction, {});

  const [deleteState, deleteFormAction, isDeleteLoading] = useActionState<
    InfoEditorActionState,
    FormData
  >(deleteMethodAction, {});

  const { data: methodList, refetch } = useQuery({
    queryKey: ['methods'],
    queryFn: getMethodListClientSide,
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
    if (methodIdRef.current) {
      methodIdRef.current.value = '';
    }
    if (labelRef.current) {
      labelRef.current.value = '';
    }
  }

  const renderMethodList =
    methodList?.map((method) => (
      <tr key={method.methodId}>
        <td>
          <form action={deleteFormAction}>
            <input name="methodId" type="hidden" value={method.methodId} />
            <button type="submit" className="cursor-pointer">
              X
            </button>
          </form>
        </td>
        <td>{method.methodId}</td>
        <td>{method.label}</td>
      </tr>
    )) ?? null;

  return (
    <section className="w-full flex flex-col gap-2">
      <h2 className="text-2xl font-bold">플레이 수단 편집기</h2>
      <table className="w-full h-48 border border-primary overflow-y-auto block border-separate border-spacing-x-2">
        <thead className="w-full sticky top-0 left-0 bg-background">
          <tr>
            <th></th>
            <th>플레이 수단 ID</th>
            <th>플레이 수단 이름</th>
          </tr>
        </thead>
        <tbody>{renderMethodList}</tbody>
      </table>
      <form
        action={createFormAction}
        className="w-full flex flex-col md:flex-row gap-2"
      >
        <div className="w-full flex flex-row gap-2">
          <FormInput
            ref={methodIdRef}
            type="text"
            id="methodId"
            name="methodId"
            placeholder="플레이 수단 ID"
          />
          <FormInput
            ref={labelRef}
            type="text"
            id="label"
            name="label"
            placeholder="플레이 수단 이름"
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
