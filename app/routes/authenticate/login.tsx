import { Form, Link, useActionData, useSearchParams, useSubmit, useTransition } from '@remix-run/react';
import { ActionFunction, json } from '@remix-run/server-runtime';
import React, { useState } from 'react';
import { GoogleLoginResponse, useGoogleLogin } from 'react-google-login';
import styled from 'styled-components';
import { Button } from '~/components/button';
import { IdInput } from '~/components/inputs/ObjectInput';
import { TextInput } from '~/components/inputs/TextInput';
import { styles } from '~/constants/styles';
import { sendEmailConfirmationEmail } from '~/utils/emails.server';
import { getBaseUrl } from '~/utils/forms';
import { googleAuth } from '~/utils/googleauth.server';
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

  const googleTokenId = form.get('googleTokenId')?.toString();

  console.log(googleTokenId);

  if (googleTokenId != null && googleTokenId != '') {

    const payload = await googleAuth(googleTokenId);

    console.log(payload?.given_name);
    console.log(payload?.family_name);
    console.log(payload?.email);

    return badRequest({});
  }

  const username = form.get('username')?.toString();
  const password = form.get('password')?.toString();

  const baseUrl = getBaseUrl(request);

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
    await sendEmailConfirmationEmail(email, baseUrl);
  }

  return createUserSession(username, admin, verifiedEmail, redirectTo ?? '/');
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
  const s = useSubmit();
  const [searchParams, setSearchParams ] = useSearchParams();
  const [ googleTokenId, setGoogleTokenId ] = useState<string | null>(null);
  const googleForm = React.useRef<HTMLFormElement>(null);

  const a = useActionData<AuthActionData>();

  React.useEffect(() => {
    if (a?.fields?.redirectTo) {
      setSearchParams(a?.fields?.redirectTo);
    }
  }, [a?.fields?.redirectTo]);

  React.useEffect(() => {
    if (googleForm.current) {
      console.log("Submitting");
      s(googleForm.current);
    }
  }, [ googleTokenId, googleForm.current ]);

  const clientId = "391028282360-8l4uf1lu3r7qiqqi27a1a5urvth0b5ju.apps.googleusercontent.com";

  const { signIn } = useGoogleLogin({
    onSuccess: (res) => {
      const r = res as GoogleLoginResponse;
      console.log("succss");
      setGoogleTokenId(r.tokenId);
    },
    onFailure: (err) => {
      console.log("failed");
      console.log(err);
    },
    clientId: clientId ?? ''
  })

  return (<AuthWrap>
    <Form method='post'>
      <FieldSet disabled={t.state === 'submitting'}>
        <input hidden={true} name='redirectTo' defaultValue={searchParams.get('redirectTo') ?? undefined} />
        <TextInput name='username' defaultValue={a?.fields?.username ?? ''} title={'Username'} />
        <TextInput password={true} name='password' defaultValue={a?.fields?.password ?? ''} title={'Password'} />
        <Link to='/authenticate/forgotPassword'>Forgot password</Link>
        <SubmitButton type='submit'>Sign In</SubmitButton>
      </FieldSet>
    </Form>
    <Form method='post' ref={googleForm}>
      <IdInput name='googleTokenId' value={googleTokenId ?? ''} />
    </Form>
    <Button onClick={() => {signIn()}}>Log in with Gooooooogle</Button>
  </AuthWrap>)
}