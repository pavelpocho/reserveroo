import { Form, useActionData, useSearchParams, useTransition } from '@remix-run/react';
import { ActionFunction, json } from '@remix-run/server-runtime';
import React from 'react';
import { TextInput } from '~/components/inputs/TextInput';
import { sendEmail } from '~/utils/emails.server';
import { getFormEssentials } from '~/utils/forms';
import { createUserSession, login, register } from '~/utils/session.server';
import { AuthActionData, AuthWrap, FieldSet, SubmitButton } from './login';

const badRequest = (data: AuthActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  
  const { getFormItem } = await getFormEssentials(request);

  // Should validate this
  const redirectTo = getFormItem('redirectTo');
  const username = getFormItem('username');
  const password = getFormItem('password');
  const phone = getFormItem('phone');
  const email = getFormItem('email');
  const firstName = getFormItem('firstName');
  const lastName = getFormItem('lastName');

  const { userId, admin } = await register({
    username,
    password,
    phone,
    email,
    firstName,
    lastName,
  }) ?? { userId: null, admin: false };

  console.log(userId);

  if (userId == null || username == null) {
    return badRequest({
      fields: { username: username ?? '', password: password ?? '', redirectTo: redirectTo ?? '' },
      formError: 'Something is wrong.'
    });
  }

  await sendEmail(email);

  return createUserSession(username, admin, /*false*/true, '/authenticate/verifyEmail');
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

  return <AuthWrap>
    <Form method='post'>
      <FieldSet disabled={t.state === 'submitting'}>
        <input hidden={true} name='redirectTo' defaultValue={searchParams.get('redirectTo') ?? undefined} />
        <TextInput title={'Username'} name='username' defaultValue={a?.fields?.username ?? ''} />
        <TextInput title={'First name'} name='firstName' defaultValue={a?.fields?.firstName ?? ''} />
        <TextInput title={'Last name'} name='lastName' defaultValue={a?.fields?.lastName ?? ''} />
        <TextInput title={'Email address'} name='email' defaultValue={a?.fields?.email ?? ''} />
        <TextInput title={'Phone number'} name='phone' defaultValue={a?.fields?.phone ?? ''} />
        <TextInput title={'Password'} password={true} name='password' defaultValue={a?.fields?.password ?? ''} />
        <SubmitButton type='submit'>Submit</SubmitButton>
        { a && a.formError && <p>
          {a.formError}
        </p> }
      </FieldSet>
    </Form>
  </AuthWrap>
}