import { createSign, createVerify } from 'crypto';

const publicKey = process.env.SIGNING_PUBLIC_KEY;
const privateKey = process.env.SIGNING_PRIVATE_KEY;

export const signMessage = (message: string) => {
  if (privateKey && publicKey) {
    const signer = createSign('rsa-sha256');
    signer.update(message);
    return signer.sign(privateKey, 'hex');
  }
  throw Error("No public or private key for signing");
}

export const verifyMessage = (message: string) => {
  if (privateKey && publicKey) {
    const verifier = createVerify('rsa-sha256');
    verifier.update(message);
    return verifier.verify(publicKey, 'hex');
  }
  throw Error("No public or private key for signing");
}