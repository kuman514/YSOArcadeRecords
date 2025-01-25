'use client';

import FormInput from '^/src/shared/ui/form-input';

export default function SignInForm() {
  /**
   * @todo
   * Apply sign-in action to sign-in form
   */

  return (
    <form className="w-full flex flex-col justify-center items-start gap-8 px-16">
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="email">이메일</label>
        <FormInput type="email" id="email" name="email" />
      </p>
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="password">비밀번호</label>
        <FormInput type="password" id="password" name="password" />
      </p>
      <button
        type="submit"
        className="w-full p-4 bg-primary hover:bg-hovering text-white rounded"
      >
        로그인
      </button>
    </form>
  );
}
