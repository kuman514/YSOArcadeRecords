'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import { ArcadeRecordPostDBInput } from '^/src/entities/types/post';
import { insertData } from '^/src/shared/supabase/database';
import { saveImage } from '^/src/shared/supabase/image';
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
  const tagIds = formData.getAll('tagIds');

  const thumbnail = formData.get('thumbnail') as File;
  const originalImages = formData.getAll('originalImages') as File[];

  const supabase = await createServerSideClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/');
  }

  const errors: ArcadeRecordActionState['errors'] = {};

  if (!title || title.trim().length === 0) {
    errors.title = 'Title required.';
  }

  if (!arcadeId) {
    errors.arcadeId = 'Arcade type required.';
  }

  if (!methodId) {
    errors.methodId = 'Method required.';
  }

  if (!achievedAt) {
    errors.achievedAt = 'Write when you achieved this record.';
  }

  if (!players) {
    errors.players = 'Number of players required.';
  }

  if (!playerSide) {
    errors.playerSide = 'Write which side you played.';
  }

  if (!evaluation) {
    errors.evaluation = 'Evaluation (score or time) required.';
  }

  if (!stage) {
    errors.stage = 'Stage required.';
  }

  if (!comment) {
    errors.comment = 'Comment required.';
  }

  if (!thumbnail.name || thumbnail.name === 'undefined') {
    errors.thumbnailUrl = 'Thumbnail required.';
  }

  if (
    !originalImages ||
    originalImages.length === 0 ||
    !originalImages[0].name ||
    originalImages[0].name === 'undefined'
  ) {
    errors.imageUrls = 'Original images required.';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const arcadeRecordId = uuidv4();
  const directory = `${arcadeId}/${arcadeRecordId}`;
  const timestamp = new Date().toISOString();

  const thumbnailUrl = await saveImage(
    thumbnail,
    `thumbnail-${timestamp}`,
    directory
  );

  const validImages = originalImages.filter((image) => image.size > 0);
  const originalImageUrls = await Promise.all<string>(
    validImages.map((file, index) =>
      saveImage(file, `original-${timestamp}-${index + 1}`, directory)
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
      tag_ids: JSON.stringify(tagIds),
      note,
      youtube_id: youTubeId,
      thumbnail_url: thumbnailUrl,
      image_urls: JSON.stringify(originalImageUrls),
      achieved_at: achievedAt!,
      created_at: formattedDate,
      modified_at: formattedDate,
    },
  });

  revalidatePath('/records');
  redirect(`/records/${arcadeId}/${arcadeRecordId}`);
}
