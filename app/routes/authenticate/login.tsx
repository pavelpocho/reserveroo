import { Form, useActionData, useSearchParams, useTransition } from '@remix-run/react';
import { ActionFunction, json } from '@remix-run/server-runtime';
import React from 'react';
import styled from 'styled-components';
import { TextInput } from '~/components/inputs/TextInput';
import { styles } from '~/constants/styles';
import { sendEmail } from '~/utils/emails.server';
import { createUserSession, login } from '~/utils/session.server';
import { signMessage } from '~/utils/signing.server';

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
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
};

const badRequest = (data: AuthActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const username = form.get('username')?.toString();
  const password = form.get('password')?.toString();

  // Should validate this
  const redirectTo = form.get('redirectTo')?.toString();

  const { userId, admin, verifiedEmail, email } = await login({
    username: username ?? '',
    password: password ?? ''
  }) ?? { userId: null, admin: false };

  if (userId == null || username == null) {
    return badRequest({
      fields: { username: username ?? '', password: password ?? '', redirectTo: redirectTo ?? '' },
      formError: 'Something is wrong.'
    });
  }

  if (!verifiedEmail) {
    // console.log(signMessage("Hello world"));
    // await sendEmail(email);
  }

  return createUserSession(username, admin, /*verifiedEmail*/true, redirectTo ?? '/');
}

export const AuthWrap = styled.div`
  width: 90%;
  max-width: 500px;
  margin: 0px auto;
  border-radius: 1rem;
  margin-top: 2rem;
  box-shadow: ${styles.shadows[0]};
  border: 1px solid ${styles.colors.gray[10]};
  box-sizing: border-box;
  padding: 1.5rem;
`;

export const FieldSet = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SubmitButton = styled.button`
  padding: 0.8rem 0rem;
  border: 1.5px solid ${styles.colors.gray[20]};
  border-radius: 0.4rem;
  background-color: ${styles.colors.white};
  cursor: pointer;
  font-size: 0.9rem;
`;

export default function Login() {

  const t = useTransition();
  const [searchParams, setSearchParams ] = useSearchParams();

  const a = useActionData<AuthActionData>();

  React.useEffect(() => {
    if (a?.fields?.redirectTo) {
      setSearchParams(a?.fields?.redirectTo);
    }
  }, [a?.fields?.redirectTo]);

  return (<AuthWrap>
    <Form method='post'>
      <FieldSet disabled={t.state === 'submitting'}>
        <input hidden={true} name='redirectTo' defaultValue={searchParams.get('redirectTo') ?? undefined} />
        <TextInput name='username' defaultValue={a?.fields?.username ?? ''} title={'Username'} />
        <TextInput password={true} name='password' defaultValue={a?.fields?.password ?? ''} title={'Password'} />
        <SubmitButton type='submit'>Sign In</SubmitButton>
      </FieldSet>
    </Form>
    </AuthWrap>
  )
}