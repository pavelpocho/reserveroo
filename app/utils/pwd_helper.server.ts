// import bcrypt from 'bcrypt';
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';
import { isConstValueNode } from 'graphql';

// export const generateHashAndSalt = async (pwd: string) => {
//   // TODO: Password validation
//   return await bcrypt.hash(pwd, 10);
// };

// export const checkPassword = async (pwd: string, hash: string) => {
//   return await bcrypt.compare(pwd, hash);
// };

export const generateHashAndSalt = async (pwd: string) => {
  const salt = randomBytes(16).toString('hex');
  const hashedPwd = scryptSync(pwd, salt, 64).toString('hex');
  return `${salt}:${hashedPwd}`;
}

export const checkPassword = async (pwd: string, hash: string) => {
  const [salt, key] = hash.split(':');
  const hashedBuffer = scryptSync(pwd, salt, 64);

  const keyBuffer = Buffer.from(key, 'hex');
  const match = timingSafeEqual(hashedBuffer, keyBuffer);
  return match;
}