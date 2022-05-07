import { Form, useLoaderData } from "@remix-run/react";
import { ActionFunction } from "@remix-run/server-runtime";
import styled from 'styled-components';
import { styles } from "~/constants/styles";
import { UnstyledLink } from "~/root";

const Wrap = styled.header`
  background-color: ${styles.colors.primary};
  height: 4rem;
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 0px 2rem;
`;

const Title = styled.h6`
  color: ${styles.colors.white};
  font-size: 1.5rem;
  margin: 0px;
`;

const MenuItem = styled.p`
  margin: 0px;
  box-sizing: border-box;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  &:hover {
    border-bottom: 2px solid ${styles.colors.white};
  }
`;

interface AppHeaderProps {
  children: React.ReactNode;
  userId: string | null;
}

export default function AppHeader({ children, userId }: AppHeaderProps) {

  return <Wrap>
    <UnstyledLink to='/'><Title>{children}</Title></UnstyledLink>
    <UnstyledLink to='/about'><MenuItem>About us</MenuItem></UnstyledLink>
    { !userId && <>
      <UnstyledLink to='/authenticate/login'><MenuItem>Sign In</MenuItem></UnstyledLink>
      <UnstyledLink to='/authenticate/register'><MenuItem>Create Account</MenuItem></UnstyledLink>
    </> }
    { userId && <>
      <Form action='/logout' method='post'>
        <input type='text' name={'redirectUrl'} hidden={true} defaultValue={'/authenticate/login'} />
        <input type='submit' />
      </Form>
    </>}
    <p>{userId ?? 'No user id'}</p>
  </Wrap>
}