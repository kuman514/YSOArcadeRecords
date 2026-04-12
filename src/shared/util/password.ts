export interface CheckIsPasswordValidResult {
  isPass: boolean;
  reason?: string;
}

export function checkIsPasswordValid(
  password: string
): CheckIsPasswordValidResult {
  if (password.length < 8 || password.length > 20) {
    return {
      isPass: false,
      reason: 'Password must be 8~20 characters long.',
    };
  }

  if (
    password.search(/[A-Z]/g) < 0 ||
    password.search(/[a-z]/g) < 0 ||
    password.search(/[0-9]/g) < 0 ||
    password.search(/[-^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`+=]/g) < 0
  ) {
    return {
      isPass: false,
      reason:
        'Password must have at least 1 uppercase alphabet, at least 1 lowercase alphabet, at least 1 digit, and at least 1 special letter.',
    };
  }

  return {
    isPass: true,
  };
}
