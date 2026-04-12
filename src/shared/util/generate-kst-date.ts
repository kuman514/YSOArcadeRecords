export function generateKstDate() {
  const date = new Date();
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  const krDiff = 9 * 60 * 60 * 1000;
  return new Date(utcTime + krDiff);
}
