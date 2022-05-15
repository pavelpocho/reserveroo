import { Link } from "@remix-run/react";
import styled from "styled-components";
import { styles } from "~/constants/styles";

const H1 = styled.h1`
  margin-top: 4rem;
  color: ${styles.colors.primary};
  text-align: center;
`;

const Button = styled.button`
  color: ${styles.colors.white};
  background-color: ${styles.colors.primary};
  border-radius: 0.4rem;
  padding: 0.7rem;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  border: none;
`;

const ALink = styled(Link)`
  text-decoration: none;
`;

export default function About() {
  return (
    <>
      <H1>
        All the <span style={{ color: styles.colors.busy }}>activities </span>
        you love in
        <span style={{ color: styles.colors.busy }}> one place</span>
      </H1>
      <ALink to='/places'>
        <Button>CHECK OUT ACTIVITIES</Button>
      </ALink>
      <H1>Why was Reserveroo created?</H1>
    </>
  );
}
