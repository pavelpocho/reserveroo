import { Link, Outlet, useSearchParams } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/server-runtime'
import React from 'react';
import styled from 'styled-components';
import { styles } from '~/constants/styles';
import { useSigningIn } from '~/contexts/signingInContext';

export const loader: LoaderFunction = () => {
  return {}
}

const Title = styled.h2`
  color: ${styles.colors.primary};
  text-align: center;
  font-size: 3rem;
`;

const SubHeader = styled.h4`
  color: ${styles.colors.action};
  text-align: center;
`;

export const TabBar = styled.div`
  margin: 0 auto;
  width: 25rem;
  justify-content: center;
  align-items: stretch;
  display: flex;
  box-shadow: ${styles.shadows[0]};
  padding: 0.8rem 0rem;
  border: 1px solid ${styles.colors.gray[10]};
  border-radius: 0.6rem;
  position: relative;
  overflow: hidden;
`;

export const Separator = styled.div`
  width: 1px;
  background-color: ${styles.colors.gray[50]};
`;

export const AuthTabLink = styled(Link)`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${styles.colors.gray[110]};
  font-weight: bold;
  text-decoration: none;
`;

export const ActiveHighlighter = styled.div<{ position: number }>`
  position: absolute;
  height: calc(100% - 0.4rem);
  border-radius: 0.4rem;
  width: calc(50% - 0.4rem);
  transition: left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  left: ${props => props.position == 0 ? '0px' : '50%'};
  top: 0px;
  margin: 0.2rem;
  background-color: ${styles.colors.action};
  z-index: -1;
`;

export default function Authenticate() {

  const [searchParams] = useSearchParams();
  const redirectTo = encodeURI(searchParams.get('redirectTo') ?? '').replace('/', '%2F');

  const [ position, setPosition ] = React.useState(0);

  const { setSigningIn } = useSigningIn();

  React.useEffect(() => {
    setSigningIn(true);
    return () => {
      setSigningIn(false);
    }
  }, []);

  return <>
    <Title>Welcome to Reserveroo.</Title>
    <SubHeader>Let's make online booking easier for everyone. Together.</SubHeader>
    <TabBar>
      <ActiveHighlighter position={position} />
      <AuthTabLink onClick={() => {setPosition(0)}} to={`/authenticate/login${!!redirectTo ? `?redirectTo=${redirectTo}` : ''}`}>Sign In</AuthTabLink>
      <Separator />
      <AuthTabLink onClick={() => {setPosition(1)}} to={`/authenticate/register${!!redirectTo ? `?redirectTo=${redirectTo}` : ''}`}>Create Account</AuthTabLink>
    </TabBar>
    <div>
      <Outlet />
    </div>
  </>
}