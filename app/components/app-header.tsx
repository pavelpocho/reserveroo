import { Form, Link, useLocation } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { styles } from "~/constants/styles";
import { useLangs } from "~/contexts/langsContext";
import { useSigningIn } from "~/contexts/signingInContext";
import { useUsername } from "~/contexts/usernameContext";
import * as cs_texts from "~/assets/langs/cs.texts.json";
import * as en_texts from "~/assets/langs/en.texts.json";
import { createCookie } from "@remix-run/node";
import GbIcon from "~/assets/icons/gb";
import CzIcon from "~/assets/icons/cz";

const Wrap = styled.header<{ signingIn: boolean }>`
  background-color: ${styles.colors.primary};
  transform: ${(props) => (props.signingIn ? "translateY(-4rem)" : "")};
  opacity: ${(props) => (props.signingIn ? "0" : "1")};
  transition: transform 0.2s cubic-bezier(0.33, 1, 0.68, 1),
    opacity 0.2s ease-out;
  height: 4rem;
  top: 0px;
  position: sticky;
  z-index: 10000;
  gap: 2rem;
  padding: 0px;
`;

const InnerWrap = styled.div`
  display: flex;
  position: relative;
  margin: 0 auto;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  height: 100%;
  max-width: 938px;
`;

const Title = styled.h6`
  color: ${styles.colors.primary};
  padding: 0.5rem;
  border-radius: 0.4rem;
  font-size: 1.375rem;
  font-weight: bold;
  margin: 0px;
  background-color: ${styles.colors.white};
  transition: background-color 0.15s;
  &:hover {
    background-color: ${styles.colors.gray[20]};
  }
  &:active {
    background-color: ${styles.colors.gray[40]};
  }
`;

const MenuItem = styled.p<{ border?: boolean }>`
  margin: 0px;
  font-size: 0.875rem;
  color: ${styles.colors.white};
  box-sizing: border-box;
  border: ${(props) =>
    props.border ? `1px solid ${styles.colors.white}` : ""};
  background-color: transparent;
  transition: background-color 0.15s;
  padding: 0.5rem 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  border-radius: 0.4rem;
  &:hover {
    background-color: ${styles.colors.white}30;
  }
  &:active {
    background-color: ${styles.colors.white}30;
  }
`;

const WrappedMenuItem = styled.p`
  margin: 0px;
  font-size: 0.875rem;
  color: ${styles.colors.white};
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
  font-size: 1rem;
  color: ${styles.colors.primary};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  padding: 0 0.4rem;
`;

const UserLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: bold;
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
  border: none;
`;

const Circle = styled.div`
  border-radius: 100%;
  height: 1.875rem;
  width: 1.875rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${styles.colors.action};
  transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
  &:hover {
    transform: scale(1.1);
  }
`;

const In = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function AppHeader({ children }: AppHeaderProps) {
  const location = useLocation();
  const [isLandingPage, setIsLandingPage] = useState(false);

  const { username, admin, usernameToVerify } = useUsername();

  const { setTranslations: setL, translations: l, lang, setLang } = useLangs();

  const { signingIn } = useSigningIn();

  useEffect(() => {
    setIsLandingPage(location.pathname === "/");
  }, [location]);

  return (
    <Wrap signingIn={signingIn ?? false}>
      <InnerWrap>
        <Side>
          <BarLink to='/places'>
            <Title>{children}</Title>
          </BarLink>
          <BarLink to={isLandingPage ? "/places" : "/"}>
            <MenuItem>{isLandingPage ? "Places" : "Who are we?"}</MenuItem>
          </BarLink>
          {admin ? (
            <BarLink to={"/admin/reservations"}>
              <MenuItem>Admin</MenuItem>
            </BarLink>
          ) : (
            <></>
          )}
        </Side>
        <Side>
          <BarLink style={{ marginRight: "0.6rem" }} to={"/admin/reservations"}>
            <MenuItem border={true}>List a business</MenuItem>
          </BarLink>
          <BarButton
            onClick={() => {
              setL(lang == "czech" ? en_texts : cs_texts);
              setLang(lang == "czech" ? "english" : "czech");
            }}
          >
            {l.name == "cs" ? (
              <Circle>
                <In>
                  <CzIcon height={"2.5rem"} />
                </In>
              </Circle>
            ) : (
              <Circle>
                <In>
                  <GbIcon height={"2.5rem"} />
                </In>
              </Circle>
            )}
          </BarButton>
          <BarLink to={"/profile"} style={{ fontWeight: "bold" }}>
            <MenuItem>
              {usernameToVerify ? "Verify your email" : username ?? "Sign In"}
              <ProfileImage>{username ? username[0] : ""}</ProfileImage>
            </MenuItem>
          </BarLink>
          {/*<StretchForm action='/logout' method='post'>
          <input type='text' name={'redirectUrl'} hidden={true} defaultValue={'/authenticate/login'} />
          {(username || usernameToVerify) && <BarButton>Logout</BarButton> }
      </StretchForm>*/}
        </Side>
      </InnerWrap>
    </Wrap>
  );
}
