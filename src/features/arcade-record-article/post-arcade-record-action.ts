'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import db from '^/src/shared/lib/db';

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

  const statement = db.prepare(`
    INSERT INTO records (arcade_record_id, title, author_id, arcade_id, method_id, players, player_side, evaluation, stage, rank, comment, tag_ids, note, youtube_id, thumbnail_url, image_urls, achieved_at, created_at, modified_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const createdDate = new Date();
  const formattedDate = `${createdDate.getFullYear()}-${String(
    createdDate.getMonth() + 1
  ).padStart(2, '0')}-${String(createdDate.getDate()).padStart(2, '0')}`;

  statement.run(
    arcadeRecordId,
    title,
    data.user.id,
    arcadeId,
    methodId,
    players,
    playerSide,
    evaluation,
    stage,
    rank,
    comment,
    tagIds ? JSON.stringify(tagIds) : null,
    note ?? null,
    youTubeId ?? null,
    thumbnailUrl,
    JSON.stringify(originalImageUrls),
    achievedAt,
    formattedDate,
    formattedDate
  );

  revalidatePath('/records');
  redirect(`/records/${arcadeId}/${arcadeRecordId}`);
}
