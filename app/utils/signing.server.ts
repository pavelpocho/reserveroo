import { createSign, createVerify } from 'crypto';

const publicKey = process.env.SIGNING_PUBLIC_KEY?.replace("_", "\n");
const privateKey = process.env.SIGNING_PRIVATE_KEY?.replace("_", "\n");

export const signMessage = (message: string) => {
  console.log("Private key");
  console.log(privateKey);
  if (privateKey && publicKey) {
    const signer = createSign('rsa-sha256');
    signer.update(message);
    return signer.sign(privateKey, 'hex');
  }
  throw Error("No public or private key for signing");
}

export const verifyMessage = (message: string, signature: string) => {
  if (privateKey && publicKey) {
    const verifier = createVerify('rsa-sha256');
    verifier.update(message);
    return verifier.verify(publicKey, signature, 'hex');
  }
  throw Error("No public or private key for signing");
}
