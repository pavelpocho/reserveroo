import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Link } from "@remix-run/react";
import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { styles } from "~/constants/styles";
import { useWhereAreWe } from "~/contexts/whereAreWeContext";
import {
  faCircleArrowDown,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Question from "~/components/landing-page/question";
import QuestionMark from "~/components/landing-page/question-mark";
import { IconRow } from "~/components/icon-row";
import { FaAngleDown, FaArrowDown, FaCaretDown } from "react-icons/fa";
import { easeIn, easeInOut, easeOut, EffectSetupObject, noEase, NoEaseObject, ScrollEffectInner, ScrollEffectWrap, useEasingFunctionXandZ } from "~/components/scroll-effects";
import { useInterval } from "~/components/scroll-effects/useInterval";
const questions = [
  {
    question:
      "Picture this (keep on scrolling):",
    offset: 1,
    factor: 0.5,
    speed: 0.4,
  },
  {
    question:
      "You are in a foreign city with your friend and want to enjoy your time. What do you do?",
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
    question: "Their phone is busy. What now?",
    offset: 8,
    factor: 0.5,
    speed: 1.1,
  },
  {
    question: "Keep on trying? You hate calling people...",
    offset: 8,
    factor: 0.5,
    speed: 1.1,
  },
  {
    question: "So what? Email them?",
    offset: 8,
    factor: 0.5,
    speed: 1.1,
  },
  {
    question: "No that's pointless, they won't reply in time...",
    offset: 8,
    factor: 0.5,
    speed: 1.1,
  },
  {
    question: "This all seems needlessly complicated.",
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
  margin-top: 0rem;
  margin-bottom: 2rem;
  font-size: 8rem;
  color: ${styles.colors.gray[50]};
  text-align: center;
`;

const H1X = styled.h1`
  font-size: 6rem;
  width: 80%;
  margin: 2rem auto;
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

const BackgroundStripe = styled.div<{ space: number, height: number }>`
  width: 100%;
  height: ${props => props.height}px;
  background-color: ${styles.colors.primary};
  margin-top: ${props => props.space}px;
`;

const BigText = styled.p<{ colour: string, space: number }>`
  font-size: 4rem;
  width: 60%;
  margin: 0 auto;
  text-align: center;
  font-weight: bold;
  color: ${props => props.colour};
  margin-top: ${props => props.space}px;
`;

const fade = keyframes`
  0% { opacity: 0 }
  30% { opacity: 1 }
  60% { opacity: 0 }
  100% { opacity: 0 }
`;

const FaAngleDownA = styled(FaAngleDown)`
  animation: ${fade} 1.5s linear 0s infinite;
`;

export default function About() {

  const { setLandingPage } = useWhereAreWe();
  const scrollEffectWrap = useRef<HTMLDivElement>(null);
  const [ scrollPosition, setScrollPosition ] = useState<number>(0);
  const [ yScroll, setYScroll ] = useState<number>(0);
  const [ yScrollPixels, setYScrollPixels ] = useState<number>(0);

  React.useEffect(() => {
    setLandingPage(true);
    const handleScroll = (ev: Event) => {
      setYScroll(() => (scrollEffectWrap.current?.scrollTop ?? 0) / (scrollEffectWrap.current?.clientHeight ?? 1));
      setYScrollPixels(() => (scrollEffectWrap.current?.scrollTop ?? 0));
    };

    const c = scrollEffectWrap.current;

    if (scrollEffectWrap.current) scrollEffectWrap.current.onscroll = handleScroll;

    return () => {
      setLandingPage(false);
      if (c) c.onscroll = null;
    };
  }, []);

  // useInterval(() => {
  //   setScrollPosition(s => s + 3);
  //   if (scrollEffectWrap.current) scrollEffectWrap.current.scroll(0, scrollPosition);
  // }, 1);

  const scrollFn = (scroll: number) => {
    if (scroll < 800) {
      return 1200 - scroll;
    }
    else if (scroll < 2000) {
      return 400;
    }
    else {
      return 2400 - scroll;
    }
  }

  //////////////

  // const startValue = 1200;
  // const standStillValue = 400;
  // const scrollToStandAt = 1400;
  // const initSlope = -1;
  // const finishSlope = -1;
  // const topOfScreenIntercept = 2400;

  const effectOne: EffectSetupObject = {
    startValue: 1000,
    standStillValue: 200,
    scrollToStandAt: 1600,
    initSlope: -2,
    finishSlope: -1,
    scrollWithZeroValue: 2400
  }

  const effectFive: EffectSetupObject = {
    startValue: 1080,
    standStillValue: 500,
    scrollToStandAt: 800,
    initSlope: -2,
    finishSlope: -1,
    scrollWithZeroValue: 1600
  }

  const effectSix: EffectSetupObject = {
    startValue: 1000,
    standStillValue: 500,
    scrollToStandAt: 1000,
    initSlope: -2,
    finishSlope: -1,
    scrollWithZeroValue: 2200
  }

  const effectTwo: NoEaseObject = {
    startValue: 1300,
    slope: -1.2
  }

  const effectThree: NoEaseObject = {
    startValue: 1400,
    slope: -1.4
  }

  const effectFour: NoEaseObject = {
    startValue: 1600,
    slope: -1.6
  }

  const { x1, x2, z1, z2 } = useEasingFunctionXandZ(effectOne);
  const { x1: x3, x2: x4, z1: z3, z2: z4 } = useEasingFunctionXandZ(effectFive);
  const { x1: x5, x2: x6, z1: z5, z2: z6 } = useEasingFunctionXandZ(effectSix);

  //////////////

  return (
    <>
    <ScrollEffectWrap ref={scrollEffectWrap}>
      <ScrollEffectInner space={4}>
        <div style={{ zIndex: 0, height: '3000px', width: '3000px', backgroundColor: 'blue', position: 'fixed', left: '-500px', top: '-1000px', borderRadius: '100%', transform: `scale(${Math.max(easeIn(yScrollPixels, effectOne, z1, z2, x1, x2) / 1000, 0)})` }}></div>
        <div style={{ zIndex: 1, height: '100px', width: '500px', backgroundColor: 'green', position: 'fixed', left: '200px', top: '0px', transform: `translate3d(0px, ${noEase(yScrollPixels, effectTwo) * 1.2}px, 0px)` }}>
          <p>Reserveroo is the shit.</p>
        </div>
        <div style={{ zIndex: 1, opacity: `${easeOut(yScrollPixels, effectSix, z5, z6, x5, x6) / 500}`, height: '100px', width: '500px', backgroundColor: 'green', position: 'fixed', left: '500px', top: '500px', transform: `rotate(${easeInOut(yScrollPixels, effectFive, z3, z4, x3, x4) / 3}deg)` }}>
          <p>Reserveroo is the shit.</p>
        </div>
        <div style={{ zIndex: 2, height: '100px', width: '300px', backgroundColor: 'red', position: 'fixed', left: '300px', top: '0px', transform: `translate3d(0px, ${easeInOut(yScrollPixels, effectOne, z1, z2, x1, x2) * 1.2}px, 0px)` }}>
          <p>Reserveroo is the shit.</p>
        </div>
        <div style={{ zIndex: 2, height: '100px', width: '300px', backgroundColor: 'yellow', position: 'fixed', left: '400px', top: '100px', transform: `translate3d(0px, ${noEase(yScrollPixels, effectTwo) * 1.2}px, 0px)` }}>
          <p>Reserveroo is the shit.</p>
        </div>
        <div style={{ zIndex: 2, height: '100px', width: '300px', backgroundColor: 'pink', position: 'fixed', left: '500px', top: '200px', transform: `translate3d(0px, ${noEase(yScrollPixels, effectThree) * 1.2}px, 0px)` }}>
          <p>Reserveroo is the shit.</p>
        </div>
        {/* <div style={{ height: '100px', width: '100px', backgroundColor: 'red', marginTop: '0', position: 'fixed', transform: `translate3d(100px, ${scrollFn(yScrollPixels / 5)}px, 0px)` }}></div> */}
        {/* <div style={{ height: '100px', width: '100px', backgroundColor: 'green', marginTop: '0', position: 'fixed', transform: `translate3d(300px, ${easeInOut(yScrollPixels / 5, screenStart, screenStop, scrollStop, initialSlope, endSlope, topOfScreenIntercept, z1, z2, x1, x2)}px, 0px)` }}></div> */}
      </ScrollEffectInner>
    </ScrollEffectWrap>
      {/* <Parallax pages={6.7} ref={paralaxRef}>
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
        <ParallaxLayer factor={1} speed={0.1} offset={0.1}>
          <div>
            <H1>What is Reserveroo?</H1>
            <IconRow invertColors={true} />
            <H1X>It's simple.<br/>It's all your favourite activities in one place.</H1X>
            <div style={{ margin: '0 auto', textAlign: 'center' }}>
              <p>Scroll down</p>
              <div>
                <FaAngleDownA style={{ animationDelay: '-1s' }} className="fade-arrow" />
                <FaAngleDownA style={{ animationDelay: '-1s' }} className="fade-arrow" />
                <FaAngleDownA style={{ animationDelay: '-1s' }} className="fade-arrow" />
              </div>
              <div>
                <FaAngleDownA style={{ animationDelay: '-0.5s' }} className="fade-arrow" />
                <FaAngleDownA style={{ animationDelay: '-0.5s' }} className="fade-arrow" />
                <FaAngleDownA style={{ animationDelay: '-0.5s' }} className="fade-arrow" />
              </div>
              <div>
                <FaAngleDownA style={{ animationDelay: '0s' }} className="fade-arrow" />
                <FaAngleDownA style={{ animationDelay: '0s' }} className="fade-arrow" />
                <FaAngleDownA style={{ animationDelay: '0s' }} className="fade-arrow" />
              </div>
            </div>
          </div>
          <div style={{ marginTop: '11000px' }}>
            <H1>Introducing Reserveroo.</H1>
            <IconRow invertColors={true} />
            <H1X>Search for what you want, book right from the app and have fun!</H1X>
          </div>
        </ParallaxLayer>
        <ParallaxLayer factor={1} sticky={{ start: 1, end: 2 }}>
          <div style={{ paddingTop: '100px' }}>
            <BackgroundStripe space={0} height={600}>
              <BigText colour={styles.colors.white} space={0}>{questions[0].question}</BigText>
            </BackgroundStripe>
          </div>
        </ParallaxLayer>
        <ParallaxLayer factor={1} speed={0.3}>
          {/* <BackgroundStripe space={900} height={800} />
          <BackgroundStripe space={600} height={400} />
          <BackgroundStripe space={300} height={200} />
          <BackgroundStripe space={150} height={100} />
          <BackgroundStripe space={100} height={50} />
          <BackgroundStripe space={50} height={2000} />
        </ParallaxLayer>
        <ParallaxLayer factor={1} speed={0.6}>
          {
            questions.map((layer, i) => (
              <BigText colour={i % 2 == 1 ? styles.colors.primary : styles.colors.white} space={i == 0 ? 1550 : i == 1 ? 950 : i == 2 ? 900 : i == 3 ? 700 : i == 4 ? 500 : i == 5 ? 300 : i == 6 ? 200 : i == 7 ? 100 : i == 8 ? 50 : i == 12 ? 1000 : 25 } key={i}>{layer.question}</BigText>
            ))
          }
        </ParallaxLayer>
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
        </ParallaxLayer>
      </Parallax> */}
    </>
  );
}
