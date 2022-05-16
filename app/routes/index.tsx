import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Link } from "@remix-run/react";
import React from "react";
import styled from "styled-components";
import { styles } from "~/constants/styles";
import { useWhereAreWe } from "~/contexts/whereAreWeContext";
import {BsQuestionLg} from "react-icons/bs"

const H1 = styled.h1`
  margin-top: 4rem;
  color: ${styles.colors.primary};
  text-align: center;
`;

const QuestionIcon = styled(BsQuestionLg)`
  font-size: 8rem;
`

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

const Wrapper = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${styles.shadows[1]};
  width: 300px;
  padding: 2rem;
  color: ${styles.colors.primary};
  background-color: ${styles.colors.gray};
`;

const ALink = styled(Link)`
  text-decoration: none;
`;

export default function About() {
  const { setLandingPage } = useWhereAreWe();

  React.useEffect(() => {
    setLandingPage(true);
    return () => {
      setLandingPage(false);
    };
  }, []);

  return (
    <>
      <Parallax pages={6}>
        <ParallaxLayer factor={1} speed={0.3}>
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
          offset={1}
          factor={1}
          speed={0.4}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: styles.colors.busy,
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
          offset={2}
          speed={0.5}
          factor={1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "red",
          }}
        >
          {/* <QuestionIcon></QuestionIcon> */}
          <Wrapper>
            How do you find out what activities are available?
            <br />A Google search perhaps?
          </Wrapper>
          {/* <QuestionIcon></QuestionIcon> */}
        </ParallaxLayer>

        <ParallaxLayer
          offset={3}
          factor={1}
          speed={0.6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: styles.colors.busy,
          }}
        >
          <Wrapper>Do you look at each website that pops up?</Wrapper>
        </ParallaxLayer>

        <ParallaxLayer
          offset={4}
          factor={1}
          speed={0.7}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: styles.colors.busy,
          }}
        >
          <Wrapper>How do you know each place is legit and open?</Wrapper>
        </ParallaxLayer>

        <ParallaxLayer
          offset={5}
          factor={1}
          speed={0.8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: styles.colors.busy,
          }}
        >
          <Wrapper>Do you have to book a spot? No? Are you sure?</Wrapper>
        </ParallaxLayer>

        <ParallaxLayer
          offset={6}
          factor={1}
          speed={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: styles.colors.busy,
          }}
        >
          <Wrapper>How do you book a spot?</Wrapper>
        </ParallaxLayer>
      </Parallax>
    </>
  );
}
