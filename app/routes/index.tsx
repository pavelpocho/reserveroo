import { Parallax, ParallaxLayer } from "@react-spring/parallax";
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
      <Parallax pages={2}>
        <ParallaxLayer 
        // offset={0} speed={0.5} factor={1}
        >
          <H1>
            All the
            <span style={{ color: styles.colors.busy }}> activities </span>
            you love in
            <span style={{ color: styles.colors.busy }}> one place</span>
          </H1>
          <ALink to='/places'>
            <Button>Check out activities</Button>
          </ALink>
          <H1>Why was Reserveroo created?</H1>
        </ParallaxLayer>
        <ParallaxLayer
          offset={0.5}
          factor={0.5}
          speed={0.75}
          style={{
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            backgroundColor: styles.colors.busy,
          }}
        >
          <h2>
            Imagine you are in a new city and you want to have some fun with
            your friend.
            <br />
            What do you do?
          </h2>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          // speed={0.9}
          factor={0.5}
          style={{
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            backgroundColor: "red",
          }}
        >
          <p>Scroll up</p>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1.5}
          factor={0.5}
          // speed={1}
          style={{
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            backgroundColor: styles.colors.busy,
          }}
        >
          <h2>
         work pls
          </h2>
        </ParallaxLayer>
      </Parallax>
    </>
  );
}
