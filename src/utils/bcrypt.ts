import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
export function GetHashAndSalt(password: string) {
  const salt = randomBytes(32).toString('base64');
  const hash = scryptSync(password, salt, 128, {
    N: 16384,
    p: 8,
    r: 2,
  }).toString('base64');
  return { salt: salt, password: hash };
}
export function CompareHashAndPass(
  password: string,
  hash: string,
  salt: string,
): boolean {
  const HashedPassBuffer = scryptSync(password, salt, 128, {
    N: 16384,
    p: 8,
    r: 2,
  });
  const StoredBuffer = Buffer.from(hash, 'base64');
  return timingSafeEqual(HashedPassBuffer, StoredBuffer);
}
