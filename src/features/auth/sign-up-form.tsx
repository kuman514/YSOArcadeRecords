'use client';

import { useActionState, useState } from 'react';

import { checkIsEmailValid } from '^/src/shared/lib/email';

import { checkIsPasswordValid } from '^/src/shared/lib/password';
import { AuthActionState } from './action-state';
import { signUp } from './sign-up';

export default function SignUpForm() {
  const [formState, formAction] = useActionState<AuthActionState, FormData>(
    signUp,
    {}
  );

  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const isSubmittable =
    checkIsEmailValid(email).isPass &&
    name.length > 0 &&
    checkIsPasswordValid(password).isPass &&
    password === passwordConfirm;

  return (
    <form
      className="w-full flex flex-col justify-center items-start gap-8 px-16"
      action={formAction}
    >
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-2 border border-primary rounded"
          value={email}
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
        />
      </p>
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="name">닉네임</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-4 py-2 border border-primary rounded"
          value={name}
          onChange={(event) => {
            setName(event.currentTarget.value);
          }}
        />
      </p>
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full px-4 py-2 border border-primary rounded"
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />
      </p>
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          className="w-full px-4 py-2 border border-primary rounded"
          value={passwordConfirm}
          onChange={(event) => {
            setPasswordConfirm(event.currentTarget.value);
          }}
        />
      </p>
      {formState.errors?.email && <p>{formState.errors.email}</p>}
      {formState.errors?.password && <p>{formState.errors.password}</p>}
      {formState.errors?.name && <p>{formState.errors.name}</p>}
      <button
        disabled={!isSubmittable}
        type="submit"
        className="w-full p-4 bg-primary hover:bg-hovering text-white rounded disabled:bg-gray-300"
      >
        계정 생성
      </button>
    </form>
  );
}
