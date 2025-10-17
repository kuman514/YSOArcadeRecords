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
import { createGalleryThemeAction } from './create-gallery-theme-action';
import { getGalleryThemeListClientSide } from './data-client';
import { deleteGalleryThemeAction } from './delete-gallery-theme-action';

function GalleryThemeFormContent() {
  const { data: galleryThemeList, refetch } = useQuery({
    queryKey: ['gallery-theme'],
    queryFn: getGalleryThemeListClientSide,
  });

  const itemList = useMemo(
    () =>
      galleryThemeList?.map((galleryTheme) => ({
        itemId: galleryTheme.galleryThemeId,
        itemTitle: galleryTheme.galleryThemeTitle,
      })) ?? [],
    [galleryThemeList]
  );

  return (
    <InfoEditor
      editorLabel="갤러리 주제 편집기"
      items={itemList}
      idLabel="갤러리 주제 ID"
      titleLabel="갤러리 주제 이름"
      idName="galleryThemeId"
      titleName="galleryThemeTitle"
      refetch={refetch}
      createItemAction={createGalleryThemeAction}
      deleteItemAction={deleteGalleryThemeAction}
    />
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
