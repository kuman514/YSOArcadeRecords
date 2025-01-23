'use client';

export default function SignUpForm() {
  /**
   * @todo
   * Apply sign-up action to sign-up form
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
        <label htmlFor="name">닉네임</label>
        <input
          type="text"
          id="name"
          name="name"
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
      <p className="w-full flex flex-col gap-2">
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          className="w-full px-4 py-2 border border-primary rounded"
        />
      </p>
      <button
        type="submit"
        className="w-full p-4 bg-primary hover:bg-hovering text-white rounded"
      >
        계정 생성
      </button>
    </form>
  );
}
