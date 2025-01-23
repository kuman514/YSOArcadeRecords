export function checkIsHaveErrorCode(
  error: unknown
): error is { code: string } {
  return Boolean((error as { code: string }).code);
}
