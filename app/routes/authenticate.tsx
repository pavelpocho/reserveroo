import { Link, Outlet, useActionData, useLocation, useSearchParams, useTransition } from '@remix-run/react'
import { LoaderFunction, redirect } from '@remix-run/server-runtime'
import React from 'react';
import styled from 'styled-components';
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

  const loc = useLocation();
  const [ position, setPosition ] = React.useState(loc.pathname.includes('register') ? 1 : 0);

  const { setSigningIn } = useWhereAreWe();

  const [searchParams, setSearchParams ] = useSearchParams();

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
      <AuthTabButton to={`/authenticate/login?${searchParams}`} onClick={() => {setPosition(0)}}>Sign In</AuthTabButton>
      <Separator />
      <AuthTabButton to={`/authenticate/register?${searchParams}`} onClick={() => {setPosition(1)}}>Create Account</AuthTabButton>
    </TabBar>
    <div>
      <Outlet />
    </div>
  </>
}