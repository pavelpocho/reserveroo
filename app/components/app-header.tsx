import { Link } from "@remix-run/react";
import { LinksFunction } from "@remix-run/react/routeModules"
import styled from 'styled-components';
import { styles } from "~/constants/styles";
import { UnstyledLink } from "~/root";
import { Button } from "./button";

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

export const AppHeader: React.FC = ({ children }) => {
  return <Wrap>
    <UnstyledLink to='/'><Title>{children}</Title></UnstyledLink>
    <UnstyledLink to='/about'><MenuItem>About us</MenuItem></UnstyledLink>
  </Wrap>
}