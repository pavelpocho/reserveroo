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
} from "@remix-run/react";
import styled from "styled-components";
import { AppHeader } from "./components/app-header";
import { styles } from "./constants/styles";
import { LangsContextProvider } from "./contexts/translationContext";

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

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <Body className="h-full">
        <LangsContextProvider>
          <AppHeader>Reserveroo</AppHeader>
          <Outlet />
        </LangsContextProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </Body>
    </html>
  );
}
