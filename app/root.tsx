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
} from "@remix-run/react";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import AppHeader from "./components/app-header";
import { styles } from "./constants/styles";
import { LangsContextProvider } from "./contexts/langsContext";
import { userIdContext, useUserId } from "./contexts/userIdContext";
import { getUserId } from "./utils/session.server";

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
  &>* {
    font-family: Source Sans Pro, Roboto, sans-serif;
  }
`;

export const loader: LoaderFunction = async ({ request }) => {
  return { userId: await getUserId(request), url: request.url };
}

interface AppHeaderLoaderData {
  userId: string | null;
}

const Main: React.FC = () => {

  const { userId } = useUserId();

  return <>
    <AppHeader userId={ userId }>Reserveroo</AppHeader>
    <Outlet />
  </>
}

export default function App() {

  const loaderData = useLoaderData<AppHeaderLoaderData>();

  React.useEffect(() => {
    setUserId(loaderData.userId);
  }, [loaderData]);

  const [ userId, setUserId ] = useState<string | null>(loaderData.userId);

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <Body className="h-full">
        
        <userIdContext.Provider value={{ userId, setUserId }}>
          <LangsContextProvider>
            <Main />
          </LangsContextProvider>
        </userIdContext.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </Body>
    </html>
  );
}
