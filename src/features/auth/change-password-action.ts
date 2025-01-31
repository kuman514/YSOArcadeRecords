'use server';

import { redirect } from 'next/navigation';

import {
  changePasswordByEmail,
  getUserByEmail,
} from '^/src/features/auth/user';
import { checkIsEmailValid } from '^/src/shared/lib/email';
import { hashUserPassword } from '^/src/shared/lib/hash';
import { checkIsPasswordValid } from '^/src/shared/lib/password';

import { AuthActionState } from './action-state';

export async function changePasswordAction(
  _: AuthActionState,
  formData: FormData
) {
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

  const hashedPassword = hashUserPassword(password);

  try {
    changePasswordByEmail(email, hashedPassword);
    redirect('/');
  } catch (error) {
    throw error;
  }
}
