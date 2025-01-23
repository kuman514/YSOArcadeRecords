import crypto from 'node:crypto';

export function hashUserPassword(rawPassword: string) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.scryptSync(rawPassword, salt, 64);
  return hashedPassword.toString('hex') + ':' + salt;
}

export function verifyPassword(
  storedPassword: string,
  suppliedPassword: string
) {
  const [hashedPassword, salt] = storedPassword.split(':');
  const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');
  const suppliedPasswordBuf = crypto.scryptSync(suppliedPassword, salt, 64);
  return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}
