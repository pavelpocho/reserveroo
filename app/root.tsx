import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import AppHeader from "./components/app-header";
import { Loader } from "./components/Loader";
import { styles } from "./constants/styles";
import { LangsContextProvider } from "./contexts/langsContext";
import { signingInContext } from "./contexts/signingInContext";
import { usernameContext } from "./contexts/usernameContext";
import { getUsernameAndAdmin } from "./utils/session.server";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Reserveroo",
  viewport: "width=device-width,initial-scale=1",
});

export const UnstyledLink = styled(Link)`
  color: ${styles.colors.white};
  text-decoration: none;
`;

const Body = styled.body`
  margin: 0px;
  padding: 0px;
  overflow-y: scroll;
  &>* {
    font-family: Source Sans Pro, Roboto, sans-serif;
  }
`;

export const loader: LoaderFunction = async ({ request }) => {
  const { username, admin, usernameToVerify } = await getUsernameAndAdmin(request)
  return json({ username, admin, usernameToVerify });
}

interface AppHeaderLoaderData {
  username: string | null;
  usernameToVerify: string | null;
  admin: boolean | null;
}

const WidthRestrictor = styled.div`
  width: 100%;
  max-width: 1368px;
  margin: 0px auto;
`;

const Footer = styled.footer`
  max-width: 1368px;
  padding: 2rem;
  margin: 0 auto;
`;

const Main: React.FC = () => {

  return <>
    <AppHeader>Reserveroo</AppHeader>
    <WidthRestrictor>
      <Outlet />
    </WidthRestrictor>
    <Footer>
      <Link to={'/about'}>About us</Link>
    </Footer>
  </>
}

export default function App() {

  const loaderData = useLoaderData<AppHeaderLoaderData>();

  const [ username, setUsername ] = useState<string | null>(loaderData.username);
  const [ usernameToVerify, setUsernameToVerify ] = useState<string | null>(loaderData.usernameToVerify);
  const [ admin, setAdmin ] = useState<boolean | null>(loaderData.admin);

  const [ loading, setLoading ] = useState<boolean | null>(false);
  const [ signingIn, setSigningIn ] = useState<boolean>(false);

  React.useEffect(() => {
    setUsername(loaderData.username);
    setAdmin(loaderData.admin);
  }, [loaderData]);

  const t = useTransition();

  React.useEffect(() => {
    setLoading(t.state === 'loading' || t.state === 'submitting');
  }, [t]);

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <Body className="h-full">
        <signingInContext.Provider value={{ signingIn, setSigningIn }}>
          <usernameContext.Provider value={{ username, setUsername, admin, setAdmin, usernameToVerify, setUsernameToVerify }}>
            <LangsContextProvider>
              <Main />
              <Loader show={loading ?? false}></Loader>
            </LangsContextProvider>
          </usernameContext.Provider>
        </signingInContext.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </Body>
    </html>
  );
}
