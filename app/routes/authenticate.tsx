import { Link, Outlet, useActionData, useSearchParams, useTransition } from '@remix-run/react'
import { LoaderFunction, redirect } from '@remix-run/server-runtime'
import React from 'react';
import styled from 'styled-components';
import { LoginComponent } from '~/components/auth/login';
import { RegisterComponent } from '~/components/auth/register';
import { IconRow } from '~/components/icon-row';
import { Title, TabBar, ActiveHighlighter, AuthTabButton, Separator } from '~/components/other/auth-components';
import { styles } from '~/constants/styles';
import { useWhereAreWe } from '~/contexts/whereAreWeContext';
import { getUsernameAndAdmin } from '~/utils/session.server';
import { AuthActionData } from './authenticate/login';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUsernameAndAdmin(request);
  if (user.username) {
    return redirect('/places');
  }
  return {}
}

export default function Authenticate() {

  const [searchParams, setSearchParams ] = useSearchParams();
  const a = useActionData<AuthActionData>();
  const t = useTransition();

  const redirectTo = encodeURI(searchParams.get('redirectTo') ?? '').replace('/', '%2F');

  const [ position, setPosition ] = React.useState(0);

  const { setSigningIn } = useWhereAreWe();

  React.useEffect(() => {
    setSigningIn(true);
    return () => {
      setSigningIn(false);
    }
  }, []);

  return <>
    <Title>Welcome to Reserveroo.</Title>
    <IconRow invertColors={true} />
    <TabBar>
      <ActiveHighlighter position={position} />
      <AuthTabButton onClick={() => {setPosition(0)}}>Sign In</AuthTabButton>
      <Separator />
      <AuthTabButton onClick={() => {setPosition(1)}}>Create Account</AuthTabButton>
    </TabBar>
    <div>
      { position == 0 && <LoginComponent a={a} searchParams={searchParams} setSearchParams={(data) => { setSearchParams(data) }} t={t} />}
      { position == 1 && <RegisterComponent a={a} searchParams={searchParams} setSearchParams={(data) => { setSearchParams(data) }} t={t} />}
    </div>
  </>
}