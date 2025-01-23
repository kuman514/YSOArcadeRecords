export interface CheckIsEmailValidResult {
  isPass: boolean;
  reason?: string;
}

export function checkIsEmailValid(email: string): CheckIsEmailValidResult {
  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return {
      isPass: false,
      reason: 'Please enter a valid email address.',
    };
  }

  return {
    isPass: true,
  };
}
