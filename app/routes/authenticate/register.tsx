import { Form, useActionData, useSearchParams, useTransition } from '@remix-run/react';
import { ActionFunction, json } from '@remix-run/server-runtime';
import React from 'react';
import { createUserSession, login, register } from '~/utils/session.server';
import { AuthActionData } from './login';

const badRequest = (data: AuthActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const username = form.get('username')?.toString();
  const password = form.get('password')?.toString();

  // Should validate this
  const redirectTo = form.get('redirectTo')?.toString();

  const { userId, admin } = await register({
    username: username ?? '',
    password: password ?? ''
  }) ?? { userId: null, admin: false };

  if (userId == null) {
    return badRequest({
      fields: { username: username ?? '', password: password ?? '', redirectTo: redirectTo ?? '' },
      formError: 'Something is wrong.'
    });
  }

  console.log("Redirect to for registration");
  console.log(redirectTo);
  console.log(userId);
  console.log(admin);

  return createUserSession(userId, admin, redirectTo ?? '/');
}

export default function Register() {

  const t = useTransition();
  const [searchParams, setSearchParams] = useSearchParams();

  const a = useActionData<AuthActionData>();

  React.useEffect(() => {
    if (a?.fields?.redirectTo) {
      setSearchParams(a?.fields?.redirectTo);
    }
  }, [a?.fields?.redirectTo]);

  return (<>
    <div>REGISTER</div>
    <Form method='post'>
      <fieldset disabled={t.state === 'submitting'}>
        <input hidden={true} name='redirectTo' defaultValue={searchParams.get('redirectTo') ?? undefined} />
        <input type='text' name='username' defaultValue={a?.fields?.username} />
        <input type='password' name='password' defaultValue={a?.fields?.password} />
        <button type='submit'>Submit</button>
      </fieldset>
    </Form>
    </>
  )
}