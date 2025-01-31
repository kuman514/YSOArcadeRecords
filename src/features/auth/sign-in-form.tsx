'use client';

import { useActionState, useState } from 'react';

import FormInput from '^/src/shared/ui/form-input';

import { checkIsEmailValid } from '^/src/shared/lib/email';
import { checkIsPasswordValid } from '^/src/shared/lib/password';
import { AuthActionState } from './action-state';
import { signInAction } from './sign-in';

export default function SignInForm() {
  const [formState, formAction] = useActionState<AuthActionState, FormData>(
    signInAction,
    {}
  );

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isSubmittable =
    checkIsEmailValid(email).isPass && checkIsPasswordValid(password).isPass;

  return (
    <form
      className="w-full flex flex-col justify-center items-start gap-8 px-16"
      action={formAction}
    >
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="email">이메일</label>
        <FormInput
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
        />
      </p>
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="password">비밀번호</label>
        <FormInput
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />
      </p>
      {formState.errors?.email && <p>{formState.errors.email}</p>}
      {formState.errors?.password && <p>{formState.errors.password}</p>}
      <button
        type="submit"
        className="w-full p-4 bg-primary hover:bg-hovering text-white rounded"
        disabled={!isSubmittable}
      >
        로그인
      </button>
    </form>
  );
}
