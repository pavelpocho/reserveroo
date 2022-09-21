import { Form, Link, useActionData, useSearchParams, useSubmit, useTransition } from '@remix-run/react';
import { Transition } from '@remix-run/react/transition';
import { ActionFunction, json, LoaderFunction } from '@remix-run/server-runtime';
import React, { useState } from 'react';
import styled from 'styled-components';
import AnglesRightIcon from '~/assets/icons/AnglesRight';
import { Button } from '~/components/button';
import { IdInput } from '~/components/inputs/ObjectInput';
import { TextInput } from '~/components/inputs/TextInput';
import { AuthWrap, FieldSet, FormError } from '~/components/other/auth-components';
import { MainButtonBtn } from '~/components/place/place-summary';
import { styles } from '~/constants/styles';
import { sendEmailConfirmationEmail } from '~/utils/emails.server';
import { badRequest, getBaseUrl } from '~/utils/forms';
import { createUserSession, login } from '~/utils/session.server';
import { signMessage } from '~/utils/signing.server';

export type AuthActionData = {
  formError?: string;
  fields?: {
    username: string | undefined;
    password: string | undefined;
    redirectTo: string | undefined;
  };
};

export const loader: LoaderFunction = () => {
  return {};
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const username = form.get('username')?.toString();
  const password = form.get('password')?.toString();

  const baseUrl = getBaseUrl(request);

  // Should validate this
  const redirectTo = form.get('redirectTo')?.toString();

  if (username == '' || username == null || password == '' || password == null) {
    return badRequest({
      fields: { username: username ?? '', password: password ?? '', redirectTo: redirectTo ?? '' },
      formError: 'Please fill in both your username and password.'
    });
  }

  const { userId, admin, verifiedEmail, email } = await login({
    username: username ?? '',
    password: password ?? ''
  }) ?? { userId: null, admin: false };

  if (userId == null) {
    return badRequest({
      fields: { username: username ?? '', password: password ?? '', redirectTo: redirectTo ?? '' },
      formError: 'Invalid username or password.'
    });
  }

  if (!verifiedEmail) {
    await sendEmailConfirmationEmail(email, baseUrl);
  }

  return createUserSession(username, admin, verifiedEmail, redirectTo ?? '/');
}

export default function Login() {

  const [searchParams, setSearchParams ] = useSearchParams();
  const a = useActionData<AuthActionData>();
  const t = useTransition();

  console.log(searchParams.get('redirectTo'));
  console.log(a?.fields?.redirectTo);

  return (<AuthWrap>
    <Form method='post' action='/authenticate/login'>
      <FieldSet disabled={t.state === 'submitting'}>
        <input hidden={true} name='redirectTo' defaultValue={searchParams.get('redirectTo') ?? a?.fields?.redirectTo ?? ''} />
        <TextInput style={{ marginBottom: '1rem' }} name='username' defaultValue={a?.fields?.username ?? ''} title={'Username'} />
        <TextInput style={{ marginBottom: '1rem' }} password={true} name='password' defaultValue={a?.fields?.password ?? ''} title={'Password'} />
        {a?.formError && <FormError>{a?.formError}</FormError>}
        <Link style={{ color: styles.colors.black, marginBottom: '1rem' }} to='/pwd/forgot'>Forgot password</Link>
        <MainButtonBtn>Sign In<AnglesRightIcon height={'1.5rem'} /></MainButtonBtn>
      </FieldSet>
    </Form>
  </AuthWrap>)
}