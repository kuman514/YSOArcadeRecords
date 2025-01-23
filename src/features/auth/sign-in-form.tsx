'use client';

export default function SignInForm() {
  /**
   * @todo
   * Apply sign-in action to sign-in form
   */

  return (
    <form className="w-full flex flex-col justify-center items-start gap-8 px-16">
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-2 border border-primary rounded"
        />
      </p>
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full px-4 py-2 border border-primary rounded"
        />
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
