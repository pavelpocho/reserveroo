import { Form, useActionData, useSearchParams, useTransition } from '@remix-run/react';
import { ActionFunction, json } from '@remix-run/server-runtime';
import React from 'react';
import { createUserSession, login } from '~/utils/session.server';

export type AuthActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    username: string;
    password: string;
    redirectTo: string;
  };
};

const badRequest = (data: AuthActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const username = form.get('username')?.toString();
  const password = form.get('password')?.toString();

  // Should validate this
  const redirectTo = form.get('redirectTo')?.toString();

  const { userId, admin } = await login({
    username: username ?? '',
    password: password ?? ''
  }) ?? { userId: null, admin: false };

  if (userId == null) {
    return badRequest({
      fields: { username: username ?? '', password: password ?? '', redirectTo: redirectTo ?? '' },
      formError: 'Something is wrong.'
    });
  }

  return createUserSession(userId, admin, redirectTo ?? '/');
}

export default function Login() {

  const t = useTransition();
  const [searchParams, setSearchParams ] = useSearchParams();

  const a = useActionData<AuthActionData>();

  React.useEffect(() => {
    if (a?.fields?.redirectTo) {
      setSearchParams(a?.fields?.redirectTo);
    }
  }, [a?.fields?.redirectTo]);

  return (<>
    <div>LOGIN</div>
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