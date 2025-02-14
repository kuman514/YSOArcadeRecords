'use server';

import { redirect } from 'next/navigation';

import { checkIsEmailValid } from '^/src/shared/lib/email';
import { checkIsPasswordValid } from '^/src/shared/lib/password';
import { createServerSideClient } from '^/src/shared/supabase/server';

import { AuthActionState } from './action-state';

export async function signInAction(_: AuthActionState, formData: FormData) {
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

  const supabase = await createServerSideClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error.name);
    return {
      errors: {
        password: 'Failed to sign in.',
      },
    };
  }

  redirect('/');
}
