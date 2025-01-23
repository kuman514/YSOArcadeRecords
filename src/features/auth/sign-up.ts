'use server';

import { redirect } from 'next/navigation';

import { createUser } from '^/src/features/auth/user';
import { createAuthSession } from '^/src/shared/lib/auth';
import { checkIsEmailValid } from '^/src/shared/lib/email';
import { checkIsHaveErrorCode } from '^/src/shared/lib/error';
import { hashUserPassword } from '^/src/shared/lib/hash';
import { checkIsPasswordValid } from '^/src/shared/lib/password';

import { AuthActionState } from './action-state';

export async function signUp(_: AuthActionState, formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const name = formData.get('name')?.toString();

  const errors: {
    email?: string;
    password?: string;
    name?: string;
  } = {};

  const emailValidationResult = checkIsEmailValid(email ?? '');
  if (!emailValidationResult.isPass) {
    errors.email = emailValidationResult.reason ?? '';
  }

  const passwordValidationResult = checkIsPasswordValid(password?.trim() ?? '');
  if (!passwordValidationResult.isPass) {
    errors.password = passwordValidationResult.reason ?? '';
  }

  if (!name) {
    errors.name = 'Please write your name.';
  }

  if (!email || !password || !name || Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);

  try {
    const id = createUser(email, hashedPassword, name);
    await createAuthSession(id);
    redirect('/training');
  } catch (error) {
    if (
      checkIsHaveErrorCode(error) &&
      error.code === 'SQLITE_CONSTRAINT_UNIQUE'
    ) {
      return {
        errors: {
          email: 'The email already exists. Try using another one.',
        },
      };
    }
    throw error;
  }
}
