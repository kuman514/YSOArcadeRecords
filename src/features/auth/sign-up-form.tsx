'use client';

import { useActionState, useState } from 'react';

import { checkIsEmailValid } from '^/src/shared/lib/email';

import { checkIsPasswordValid } from '^/src/shared/lib/password';
import FormInput from '^/src/shared/ui/form-input';

import { AuthActionState } from './action-state';
import { signUpAction } from './sign-up';

export default function SignUpForm() {
  const [formState, formAction] = useActionState<AuthActionState, FormData>(
    signUpAction,
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
        <label htmlFor="name">닉네임</label>
        <FormInput
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(event) => {
            setName(event.currentTarget.value);
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
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <FormInput
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
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
