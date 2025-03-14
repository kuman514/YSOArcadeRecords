'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import { ArcadeRecordPostDBInput } from '^/src/entities/types/post';
import { insertData } from '^/src/shared/supabase/database';
import { resizeImage, saveImage } from '^/src/shared/supabase/image';
import { createServerSideClient } from '^/src/shared/supabase/server';
import { ArcadeRecordActionState } from './types';

export async function postArcadeRecordAction(
  _: ArcadeRecordActionState,
  formData: FormData
) {
  const title = formData.get('title')?.toString();
  const arcadeId = formData.get('arcadeId')?.toString();
  const methodId = formData.get('methodId')?.toString();
  const achievedAt = formData.get('achievedAt')?.toString();
  const players = formData.get('players')?.toString();
  const playerSide = formData.get('playerSide')?.toString();
  const evaluation = formData.get('evaluation')?.toString();
  const stage = formData.get('stage')?.toString();
  const rank = formData.get('rank')?.toString();
  const comment = formData.get('comment')?.toString();
  const note = formData.get('note')?.toString();
  const youTubeId = formData.get('youTubeId')?.toString();
  const tags = formData.get('tags')?.toString();

  const thumbnail = formData.get('thumbnail') as File;
  const originalImages = formData.getAll('originalImages') as File[];

  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const errors: ArcadeRecordActionState['errors'] = {};

  if (!title || title.trim().length === 0) {
    errors.title = '제목을 입력해주십시오.';
  }

  if (!arcadeId) {
    errors.arcadeId = '아케이드 부문을 입력해주십시오.';
  }

  if (!methodId) {
    errors.methodId = '수단을 입력해주십시오.';
  }

  if (!achievedAt) {
    errors.achievedAt = '달성일자를 입력해주십시오.';
  }

  if (!players) {
    errors.players = '몇 명이서 플레이했는지 선택해주십시오.';
  }

  if (!playerSide) {
    errors.playerSide = '어느 사이드에서 플레이했는지 선택해주십시오.';
  }

  if (!evaluation) {
    errors.evaluation = '점수 또는 클리어 타임을 입력해주십시오.';
  }

  if (!stage) {
    errors.stage = '어느 스테이지에서 끝났는지 입력해주십시오.';
  }

  if (!comment) {
    errors.comment = '코멘터리를 입력해주십시오.';
  }

  if (!thumbnail.name || thumbnail.name === 'undefined') {
    errors.thumbnailUrl = '썸네일을 선택해주십시오.';
  }

  if (
    !originalImages ||
    originalImages.length === 0 ||
    !originalImages[0].name ||
    originalImages[0].name === 'undefined'
  ) {
    errors.imageUrls = '원본 이미지들을 선택해주십시오.';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const arcadeRecordId = uuidv4();
  const directory = `${arcadeId}/${arcadeRecordId}`;
  const timestamp = new Date().toISOString();

  const thumbnailUrl = await saveImage(
    await resizeImage(thumbnail, {
      maxWidth: 480,
      maxHeight: 480,
    }),
    `thumbnail-${timestamp}`,
    directory
  );

  const validImages = originalImages.filter((image) => image.size > 0);
  const originalImageUrls = await Promise.all<string>(
    validImages.map(
      async (file, index) =>
        await saveImage(
          await resizeImage(file, { maxWidth: 1024, maxHeight: 1024 }),
          `original-${timestamp}-${index + 1}`,
          directory
        )
    )
  );

  const createdDate = new Date();
  const formattedDate = `${createdDate.getFullYear()}-${String(
    createdDate.getMonth() + 1
  ).padStart(2, '0')}-${String(createdDate.getDate()).padStart(2, '0')}`;

  await insertData<Omit<ArcadeRecordPostDBInput, 'id'>>({
    insertInto: 'records',
    value: {
      title: title!,
      arcade_id: arcadeId!,
      arcade_record_id: arcadeRecordId!,
      method_id: methodId!,
      players: Number(players),
      player_side: Number(playerSide),
      evaluation: evaluation!,
      stage: stage!,
      rank,
      comment: comment!,
      tags:
        tags
          ?.split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0) ?? [],
      note,
      youtube_id: youTubeId,
      thumbnail_url: thumbnailUrl,
      image_urls: originalImageUrls,
      achieved_at: achievedAt!,
      created_at: formattedDate,
      modified_at: formattedDate,
    },
  });

  revalidatePath('/records');
  redirect(`/records/${arcadeId}/${arcadeRecordId}`);
}
