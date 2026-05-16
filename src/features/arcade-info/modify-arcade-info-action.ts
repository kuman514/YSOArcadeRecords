'use server';

import { redirect } from 'next/navigation';

import { InfoEditorActionState } from '^/src/entities/info-editor/types';
import { createServerSideClient } from '^/src/shared/supabase/server';

import { modifyArcadeInfo } from './data';

export async function modifyArcadeInfoAction(
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
  const description = formData.get('description')?.toString();
  const availableStagesText = formData.get('availableStagesText')?.toString();
  const availableRanksText = formData.get('availableRanksText')?.toString();
  const availableTagsText = formData.get('availableTagsText')?.toString();

  const availableStages =
    availableStagesText
      ?.split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0) ?? [];
  const availableRanks =
    availableRanksText
      ?.split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0) ?? [];
  const availableTags =
    availableTagsText
      ?.split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0) ?? [];

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

  if (!description) {
    return {
      isSuccess: false,
      errorMessage: '아케이드 부문 설명을 입력해주세요.',
    } satisfies InfoEditorActionState;
  }

  if (availableStages.length === 0) {
    return {
      isSuccess: false,
      errorMessage: '아케이드 부문에 진출 가능한 스테이지를 입력해주세요.',
    } satisfies InfoEditorActionState;
  }

  try {
    await modifyArcadeInfo(arcadeId, {
      arcadeId,
      label,
      description,
      availableStages,
      availableRanks,
      availableTags,
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
