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

import { InfoEditorActionState } from '^/src/entities/info-editor/types';
import FormInput from '^/src/shared/ui/form-input';

import { createGalleryThemeAction } from './create-gallery-theme-action';
import { getGalleryThemeListClientSide } from './data-client';
import { deleteGalleryThemeAction } from './delete-gallery-theme-action';

function GalleryThemeFormContent() {
  const galleryThemeIdRef = useRef<HTMLInputElement>(null);
  const galleryThemeTitleRef = useRef<HTMLInputElement>(null);

  const [createState, createFormAction, isCreateLoading] = useActionState<
    InfoEditorActionState,
    FormData
  >(createGalleryThemeAction, {});

  const [deleteState, deleteFormAction, isDeleteLoading] = useActionState<
    InfoEditorActionState,
    FormData
  >(deleteGalleryThemeAction, {});

  const { data: galleryThemeList, refetch } = useQuery({
    queryKey: ['gallery-theme'],
    queryFn: getGalleryThemeListClientSide,
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
    if (galleryThemeIdRef.current) {
      galleryThemeIdRef.current.value = '';
    }
    if (galleryThemeTitleRef.current) {
      galleryThemeTitleRef.current.value = '';
    }
  }

  const renderGalleryThemeList =
    galleryThemeList?.map((galleryTheme) => (
      <tr key={galleryTheme.galleryThemeId}>
        <td>
          <form action={deleteFormAction}>
            <input
              name="galleryThemeId"
              type="hidden"
              value={galleryTheme.galleryThemeId}
            />
            <button type="submit" className="cursor-pointer">
              X
            </button>
          </form>
        </td>
        <td>{galleryTheme.galleryThemeId}</td>
        <td>{galleryTheme.galleryThemeTitle}</td>
      </tr>
    )) ?? null;

  return (
    <section className="w-full flex flex-col gap-2">
      <h2 className="text-2xl font-bold">갤러리 주제 편집기</h2>
      <table className="w-full h-48 border border-primary overflow-y-auto block border-separate border-spacing-x-2">
        <thead className="w-full sticky top-0 left-0 bg-background">
          <tr>
            <th></th>
            <th>갤러리 주제 ID</th>
            <th>갤러리 주제 이름</th>
          </tr>
        </thead>
        <tbody>{renderGalleryThemeList}</tbody>
      </table>
      <form
        action={createFormAction}
        className="w-full flex flex-col md:flex-row gap-2"
      >
        <div className="w-full flex flex-row gap-2">
          <FormInput
            ref={galleryThemeIdRef}
            type="text"
            id="galleryThemeId"
            name="galleryThemeId"
            placeholder="갤러리 주제 ID"
          />
          <FormInput
            ref={galleryThemeTitleRef}
            type="text"
            id="galleryThemeTitle"
            name="galleryThemeTitle"
            placeholder="갤러리 주제 이름"
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

export default function GalleryThemeForm() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GalleryThemeFormContent />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
