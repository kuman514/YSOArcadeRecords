'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { destroySession, verifyAuth } from '^/src/shared/lib/auth';
import db from '^/src/shared/lib/db';

import { ArcadeRecordActionState } from './types';

export async function deleteArcadeRecordAction(formData: FormData) {
  const arcadeRecordId = formData.get('arcadeRecordId')?.toString();

  const userInfo = await verifyAuth();
  if (!userInfo || !userInfo.user) {
    destroySession();
    redirect('/');
  }

  const errors: ArcadeRecordActionState['errors'] = {};

  if (!arcadeRecordId) {
    errors.arcadeRecordId = 'Aracde record ID required.';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const statement = db.prepare(`
    DELETE FROM records WHERE arcadeRecordId = ?
  `);

  statement.run(arcadeRecordId);

  revalidatePath('/records');
  redirect(`/records`);
}
