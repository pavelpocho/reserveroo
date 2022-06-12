import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Link } from "@remix-run/react";
import React from "react";
import styled from "styled-components";
import { styles } from "~/constants/styles";
import { useWhereAreWe } from "~/contexts/whereAreWeContext";
import {
  faCircleArrowDown,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Question from "~/components/landing-page/question";
import QuestionMark from "~/components/landing-page/question-mark";

const questions = [
  {
    question:
      "Imagine you are in a new city and you want to have some fun with your friend. What do you do?",
    offset: 1,
    factor: 0.5,
    speed: 0.4,
  },
  {
    question:
      "How do you find out what activities are available? A Google search perhaps?",
    offset: 2,
    factor: 0.5,
    speed: 0.4,
  },
  {
    question: "Do you look at each website that pops up?",
    offset: 3,
    factor: 0.5,
    speed: 0.5,
  },
  {
    question: "How do you know each place is legit and open?",
    offset: 4,
    factor: 0.5,
    speed: 0.6,
  },
  {
    question: "Do you have to book a spot? No? Are you sure?",
    offset: 5,
    factor: 0.5,
    speed: 0.7,
  },
  { question: "How do you book a spot?", offset: 6, factor: 0.5, speed: 0.8 },
  {
    question: "No booking system. Do you call them?",
    offset: 7,
    factor: 0.5,
    speed: 0.9,
  },
  {
    question: "Their phone is busy (or you just don’t like calling people)?",
    offset: 8,
    factor: 0.5,
    speed: 1.1,
  },
];

const questionMarks = [
  {
    right: "5rem",
    "margin-top": "3rem",
    rotation: "25deg",
    start: 1.8
  },
  {
    left: "10rem",
    "margin-top": "5rem",
    rotation: "-25deg",
    start: 2.8
  },
  {
    right: "15rem",
    "margin-top": "25rem",
    rotation: "25deg",
    start: 3.8
  },
  {
    left: "20rem",
    "margin-top": "20rem",
    rotation: "-25deg",
    start: 4.8
  },
  // {
  //   right: "5rem",
  //   "margin-top": "3rem",
  //   rotation: "25deg",
  // },
  // {
  //   left: "10rem",
  //   "margin-top": "5rem",
  //   rotation: "-25deg",
  // },
  // {
  //   right: "5rem",
  //   "margin-top": "3rem",
  //   rotation: "25deg",
  // },
  // {
  //   left: "10rem",
  //   "margin-top": "5rem",
  //   rotation: "-25deg",
  // },
];

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

const Arrow = styled(FontAwesomeIcon)`
  display: flex;
  margin: 0 auto;
  font-size: 2.5rem;
  color: ${styles.colors.primary};
`;

const FirstQuestionMark = styled(FontAwesomeIcon)`
  right: 5rem;
  margin-top: 3rem;
  font-size: 2.5rem;
  transform: rotate(25deg);
  position: absolute;
`;
const SecondQuestionMark = styled(FontAwesomeIcon)`
  left: 10rem;
  margin-top: 5rem;
  font-size: 2.5rem;
  transform: rotate(-25deg);
  position: absolute;
`;
const ThirdQuestionMark = styled(FontAwesomeIcon)`
  left: 15rem;
  margin-top: 25rem;
  font-size: 2.5rem;
  transform: rotate(25deg);
  position: absolute;
`;
const FourthQuestionMark = styled(FontAwesomeIcon)`
  right: 20rem;
  margin-top: 20rem;
  font-size: 2.5rem;
  transform: rotate(-25deg);
  position: absolute;
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
      <Parallax pages={9}>
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
          <Arrow icon={faCircleArrowDown}></Arrow>
          <p style={{ textAlign: "center" }}>Scroll down</p>
        </ParallaxLayer>
        {questionMarks.map((questionMark) => (
          <QuestionMark
            {...questionMark}
            key={questionMark.start}
          ></QuestionMark>
        ))}
        {questions.map((layer) => (
          <Question
            key={layer.offset}
            question={layer.question}
            offset={layer.offset}
            factor={layer.factor}
            speed={layer.speed}
          ></Question>
        ))}
        {/* <ParallaxLayer sticky={{ start: 1.8, end: 9 }}>
          <FirstQuestionMark icon={faQuestion}></FirstQuestionMark>
        </ParallaxLayer>
        <ParallaxLayer sticky={{ start: 2.8, end: 9 }}>
          <SecondQuestionMark icon={faQuestion}></SecondQuestionMark>
        </ParallaxLayer>
        <ParallaxLayer sticky={{ start: 3.8, end: 9 }}>
          <ThirdQuestionMark icon={faQuestion}></ThirdQuestionMark>
        </ParallaxLayer>
        <ParallaxLayer sticky={{ start: 4.8, end: 9 }}>
          <FourthQuestionMark icon={faQuestion}></FourthQuestionMark>
        </ParallaxLayer> */}
      </Parallax>
    </>
  );
}
