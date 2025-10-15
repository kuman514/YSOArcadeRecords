'use server';

import { redirect } from 'next/navigation';

import { InfoEditorActionState } from '^/src/entities/types/info-editor';
import { createServerSideClient } from '^/src/shared/supabase/server';

import { deleteGalleryTheme } from './data';

export async function deleteGalleryThemeAction(
  _: InfoEditorActionState,
  formData: FormData
) {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const galleryThemeId = formData.get('galleryThemeId')?.toString();

  if (!galleryThemeId) {
    return {
      isSuccess: false,
      errorMessage: '갤러리 주제 ID를 입력해주세요.',
    } satisfies InfoEditorActionState;
  }

  try {
    await deleteGalleryTheme(galleryThemeId);
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
