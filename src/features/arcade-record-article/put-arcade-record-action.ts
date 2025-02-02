'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { destroySession, verifyAuth } from '^/src/shared/lib/auth';
import db from '^/src/shared/lib/db';
import { saveImage } from '^/src/shared/lib/image';

import { ArcadeRecordActionState } from './types';

export async function putArcadeRecordAction(
  _: ArcadeRecordActionState,
  formData: FormData
) {
  const arcadeRecordId = formData.get('arcadeRecordId')?.toString();

  const title = formData.get('title')?.toString();
  const arcadeId = formData.get('arcadeId')?.toString();
  const methodId = formData.get('methodId')?.toString();
  const achievedAt = formData.get('achievedAt')?.toString();
  const players = formData.get('players')?.toString();
  const playerSide = formData.get('playerSide')?.toString();
  const evaluation = formData.get('evaluation')?.toString();
  const stage = formData.get('stage')?.toString();
  const comment = formData.get('comment')?.toString();
  const note = formData.get('note')?.toString();
  const youTubeId = formData.get('youTubeId')?.toString();
  const tagIds = formData.getAll('tagIds');

  const presentThumbnailUrl =
    formData.get('presentThumbnailUrl')?.toString() ?? '';
  const presentImageUrls = formData.get('presentImageUrls')?.toString() ?? '';

  const thumbnail = formData.get('thumbnail') as File;
  const originalImages = formData.getAll('originalImages') as File[];

  const userInfo = await verifyAuth();
  if (!userInfo || !userInfo.user) {
    destroySession();
    redirect('/');
  }

  const errors: ArcadeRecordActionState['errors'] = {};

  if (!arcadeRecordId) {
    errors.arcadeRecordId = 'Aracde record ID required.';
  }

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

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  console.log(originalImages);

  const thumbnailUrl = thumbnail.name
    ? await saveImage(
        thumbnail,
        `${arcadeId}--${arcadeRecordId}--thumbnail`,
        'records'
      )
    : presentThumbnailUrl;

  const validImages = originalImages.filter((image) => Boolean(image.name));
  const originalImageUrls = JSON.parse(presentImageUrls).concat(
    await Promise.all<string>(
      validImages.map((file, index) =>
        saveImage(
          file,
          `${arcadeId}--${arcadeRecordId}--original-${index + 1}`,
          'records'
        )
      )
    )
  );

  const statement = db.prepare(`
    UPDATE records SET title = ?, arcadeId = ?, methodId = ?, players = ?, playerSide = ?, evaluation = ?, stage = ?, comment = ?, tagIds = ?, note = ?, youTubeId = ?, thumbnailUrl = ?, imageUrls = ?, achievedAt = ?, modifiedAt = ? WHERE arcadeRecordId = ?
  `);

  const createdDate = new Date();
  const formattedDate = `${createdDate.getFullYear()}-${String(
    createdDate.getMonth() + 1
  ).padStart(2, '0')}-${String(createdDate.getDate()).padStart(2, '0')}`;

  statement.run(
    title,
    arcadeId,
    methodId,
    players,
    playerSide,
    evaluation,
    stage,
    comment,
    tagIds ? JSON.stringify(tagIds) : null,
    note ?? null,
    youTubeId ?? null,
    thumbnailUrl,
    JSON.stringify(originalImageUrls),
    achievedAt,
    formattedDate,
    arcadeRecordId
  );

  revalidatePath('/records');
  redirect(`/records/${arcadeId}/${arcadeRecordId}`);
}
