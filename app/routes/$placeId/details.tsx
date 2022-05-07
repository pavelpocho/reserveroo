import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import styled from "styled-components";
import { styles } from "~/constants/styles";

const Wrap = styled.div`
  background-color: ${styles.colors.gray[10]};
`;

export const loader: LoaderFunction = () => {
  return json({});
}

export const Details: React.FC = ({ children }) => {
  return <Wrap>
    <p>Details about the business</p>
    <p>Opening hours</p>
    <p>Details about whats there and whatnot</p>
  </Wrap>
}