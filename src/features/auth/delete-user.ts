'use server';

import { redirect } from 'next/navigation';

import { deleteUserById, getUserById } from '^/src/features/auth/user';
import { destroySession } from '^/src/shared/lib/auth';

export async function deleteUser(_: unknown, formData: FormData) {
  const id = formData.get('userId')?.toString();

  if (!id) {
    return {
      errors: {
        account: 'This account does not exist.',
      },
    };
  }

  const existingUser = getUserById(id);

  if (!existingUser) {
    return {
      errors: {
        account: 'This account does not exist.',
      },
    };
  }

  try {
    /**
     * Destroy session first since the user ID is FOREIGN KEY of session table.
     */
    await destroySession();
    deleteUserById(id);
    redirect('/');
  } catch (error) {
    console.error(error);
    return {
      errors: {
        misc: 'Please try again.',
      },
    };
  }
}
