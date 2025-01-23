'use server';

import { redirect } from 'next/navigation';

import { getUserByEmail } from '^/src/features/auth/user';
import { createAuthSession } from '^/src/shared/lib/auth';
import { checkIsEmailValid } from '^/src/shared/lib/email';
import { verifyPassword } from '^/src/shared/lib/hash';
import { checkIsPasswordValid } from '^/src/shared/lib/password';

export async function signIn(_: unknown, formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  const errors: {
    email?: string;
    password?: string;
  } = {};

  const emailValidationResult = checkIsEmailValid(email ?? '');
  if (!emailValidationResult.isPass) {
    errors.email = emailValidationResult.reason ?? '';
  }

  const passwordValidationResult = checkIsPasswordValid(password?.trim() ?? '');
  if (!passwordValidationResult.isPass) {
    errors.password = passwordValidationResult.reason ?? '';
  }

  if (!email || !password || Object.keys(errors).length > 0) {
    return { errors };
  }

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: 'This account does not exist.',
      },
    };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password: 'Wrong password.',
      },
    };
  }

  await createAuthSession(existingUser.id);
  redirect('/training');
}
