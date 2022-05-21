import { createSign, createVerify } from 'crypto';

var publicKey = process.env.SIGNING_PUBLIC_KEY ?? '';
while (publicKey.includes("_")) {
  publicKey = publicKey.replace("_", "\n")
}
while (publicKey.includes(",")) {
  publicKey = publicKey.replace(",", " ")
}
var privateKey = process.env.SIGNING_PRIVATE_KEY ?? '';
while (privateKey.includes("_")) {
  privateKey = privateKey.replace("_", "\n")
}
while (privateKey.includes(",")) {
  privateKey = privateKey.replace(",", " ")
}

export const signMessage = (message: string) => {
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
