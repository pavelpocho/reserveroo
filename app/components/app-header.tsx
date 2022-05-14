import { Form, Link } from "@remix-run/react";
import React from "react";
import styled from 'styled-components';
import { styles } from "~/constants/styles";
import { useLangs } from "~/contexts/langsContext";
import { useSigningIn } from "~/contexts/signingInContext";
import { useUsername } from "~/contexts/usernameContext";
import * as cs_texts from '~/assets/langs/cs.texts.json';
import * as en_texts from '~/assets/langs/en.texts.json';
import { createCookie } from "@remix-run/node";

const Wrap = styled.header<{ signingIn: boolean }>`
  background-color: ${styles.colors.primary};
  transform: ${props => props.signingIn ? 'translateY(-4rem)' : ''};
  opacity: ${props => props.signingIn ? '0' : '1'};
  transition: transform 0.2s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.2s ease-out;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  top: 0px;
  position: sticky;
  gap: 2rem;
  padding: 0px;
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
`;

interface AppHeaderProps {
  children: React.ReactNode;
}

const ProfileImage = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 100%;
  background-color: ${styles.colors.white};
`;

const Side = styled.div`
  display: flex;
  align-items: stretch;
`;

const BarLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${styles.colors.white};
  text-decoration: none;
  padding: 0 1.5rem;
  &:hover {
    background-color: ${styles.colors.gray[10]}20;
  }
`;

const UserLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${styles.colors.white};
  text-decoration: none;
  padding: 0 1.5rem;
  &:hover {
    background-color: ${styles.colors.gray[10]}20;
  }
`;

const StretchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: stretch;
`;

const BarButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  margin: 0px;
  background-color: transparent;
  cursor: pointer;
  padding: 0 1.5rem;
  color: ${styles.colors.white};
  &:hover {
    background-color: ${styles.colors.gray[10]}20;
  }
  border: none;
`;



export default function AppHeader({ children }: AppHeaderProps) {

  const { username, admin, usernameToVerify } = useUsername();

  const { setTranslations: setL, translations: l, lang, setLang } = useLangs();

  const { signingIn } = useSigningIn();

  return <Wrap signingIn={signingIn ?? false}>
    <Side>
      <BarLink to='/'><Title>{children}</Title></BarLink>
      <BarLink to='/about'><MenuItem>About us</MenuItem></BarLink>
    </Side>
    <Side>
      <BarButton onClick={() => {
        setL(lang == 'czech' ? en_texts : cs_texts);
        setLang(lang == 'czech' ? 'english' : 'czech');
      }}>{l.name == 'cs' ? 'English' : 'Čeština'}</BarButton>
      <UserLink to={'/profile'}>
        <ProfileImage />
        {usernameToVerify ? 'Verify your email' : (username ?? 'Sign In')}
      </UserLink>
      <StretchForm action='/logout' method='post'>
        <input type='text' name={'redirectUrl'} hidden={true} defaultValue={'/authenticate/login'} />
        {admin ? <BarLink to={'/admin/reservations'}>Admin Tools</BarLink> : <></>}
        {(username || usernameToVerify) && <BarButton>Logout</BarButton> }
      </StretchForm>
    </Side>
  </Wrap>
}