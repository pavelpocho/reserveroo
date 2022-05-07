import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { createUser, getUser, getUserByName } from "~/models/user.server";
import { checkPassword, generateHashAndSalt } from "./pwd_helper.server";


interface LoginType {
  username: string;
  password: string;
}

export const login = async ({ username, password }: LoginType) => {

  if (username == '') return null;

  const user = await getUserByName({ username });

  if (user == null) return null;

  const passwordMatch = await checkPassword(password, user.passwordHash);

  if (!passwordMatch) return null;

  return user.id;

}

export const register = async ({ username, password }: LoginType) => {

  if (username == '') return null;

  if (await getUserByName({ username }) != null) return null;

  const newUser = await createUser({ username, passwordHash: await generateHashAndSalt(password), email: username });

  return newUser.id;

}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("You have no session secret, idiot.");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'reserveroo-session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})

export const createUserSession = async (userId: string, redirectTo: string) => {
  const session = await storage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session)
    }
  })
}

const getUserSession = (request: Request) => {
  return storage.getSession(request.headers.get('Cookie'));
}

export const requireUserId = async (
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) => {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([
      ['redirectTo', redirectTo]
    ]);
    throw redirect(`/authenticate/login?${searchParams}`);
  } 
  return userId;
}

export const getUserId = async (
  request: Request
) => {
  const session = await getUserSession(request);
  return session.get('userId') as string | null;
}

export const logout = async (request: Request, redirectUrl: string) => {
  const session = await getUserSession(request);
  return redirect(redirectUrl, {
    headers: {
      'Set-Cookie': await storage.destroySession(session)
    }
  })
}