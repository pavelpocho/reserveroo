import bcrypt from 'bcrypt';

export const generateHashAndSalt = async (pwd: string) => {
  return await bcrypt.hash(pwd, 10);
};

export const checkPassword = async (pwd: string, hash: string) => {
  return await bcrypt.compare(pwd, hash);
};