'use server';

import { redirect } from 'next/navigation';

import { InfoEditorActionState } from '^/src/entities/info-editor/types';
import { createServerSideClient } from '^/src/shared/supabase/server';

import { createGalleryTheme } from './data';

export async function createGalleryThemeAction(
  _: InfoEditorActionState,
  formData: FormData
) {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const galleryThemeId = formData.get('galleryThemeId')?.toString();
  const galleryThemeTitle = formData.get('galleryThemeTitle')?.toString();

  if (!galleryThemeId) {
    return {
      isSuccess: false,
      errorMessage: '갤러리 주제 ID를 입력해주세요.',
    } satisfies InfoEditorActionState;
  }

  if (!galleryThemeTitle) {
    return {
      isSuccess: false,
      errorMessage: '갤러리 주제 이름을 입력해주세요.',
    } satisfies InfoEditorActionState;
  }

  try {
    await createGalleryTheme({
      galleryThemeId,
      galleryThemeTitle,
    });

    return {
      isSuccess: true,
    } satisfies InfoEditorActionState;
  } catch (error) {
    return {
      isSuccess: false,
      errorMessage: `서버에서 에러가 발생했습니다. (${error})`,
    } satisfies InfoEditorActionState;
  }
}
