'use server';

import { redirect } from 'next/navigation';

import { InfoEditorActionState } from '^/src/entities/info-editor/types';
import { createServerSideClient } from '^/src/shared/supabase/server';

import { createMethod } from './data';

export async function createMethodAction(
  _: InfoEditorActionState,
  formData: FormData
) {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const methodId = formData.get('methodId')?.toString();
  const label = formData.get('label')?.toString();

  if (!methodId) {
    return {
      isSuccess: false,
      errorMessage: '플레이 수단 ID를 입력해주세요.',
    } satisfies InfoEditorActionState;
  }

  if (!label) {
    return {
      isSuccess: false,
      errorMessage: '플레이 수단 이름을 입력해주세요.',
    } satisfies InfoEditorActionState;
  }

  try {
    await createMethod({
      methodId,
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
