import { OAuth2Client } from "google-auth-library";

export const googleAuth = async (googleTokenId: string) => {
  console.log(googleTokenId);
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: googleTokenId,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const payload = ticket.getPayload();
  return payload;
}