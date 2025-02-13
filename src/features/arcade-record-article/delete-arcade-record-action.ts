'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { destroySession, verifyAuth } from '^/src/shared/lib/auth';
import db from '^/src/shared/lib/db';

export async function deleteArcadeRecordAction(formData: FormData) {
  const arcadeRecordId = formData.get('arcadeRecordId')?.toString();

  const userInfo = await verifyAuth();
  if (!userInfo || !userInfo.user) {
    destroySession();
    redirect('/');
  }

  const statement = db.prepare(`
    DELETE FROM records WHERE arcade_record_id = ?
  `);

  statement.run(arcadeRecordId);

  revalidatePath('/records');
  redirect(`/records`);
}
