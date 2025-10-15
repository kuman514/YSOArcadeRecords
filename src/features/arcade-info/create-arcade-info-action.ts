'use server';

import { redirect } from 'next/navigation';

import { InfoEditorActionState } from '^/src/entities/types/info-editor';
import { createServerSideClient } from '^/src/shared/supabase/server';

import { createArcadeInfo } from './data';

export async function createArcadeInfoAction(
  _: InfoEditorActionState,
  formData: FormData
) {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const arcadeId = formData.get('arcadeId')?.toString();
  const label = formData.get('label')?.toString();

  if (!arcadeId) {
    return {
      isSuccess: false,
      errorMessage: '아케이드 부문 ID를 입력해주세요.',
    } satisfies InfoEditorActionState;
  }

  if (!label) {
    return {
      isSuccess: false,
      errorMessage: '아케이드 부문 제목을 입력해주세요.',
    } satisfies InfoEditorActionState;
  }

  try {
    await createArcadeInfo({
      arcadeId,
      label,
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
