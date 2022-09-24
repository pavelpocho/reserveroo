import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Link } from "@remix-run/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { FaAngleDown, FaArrowDown, FaCaretDown, FaSearch, FaUserFriends } from "react-icons/fa";
import { easeIn, easeInOut, easeOut, EffectSetupObject, noEase, NoEaseObject, ScrollEffectInner, ScrollEffectWrap, getEasingFunctionXandZ as getEasingInfo } from "~/components/scroll-effects";
import { useInterval } from "~/components/scroll-effects/useInterval";
import { useSpring, animated } from 'react-spring'
import { config } from "aws-sdk";
const questions = [
  {
    question:
      "You are somewhere new with your friend and want to do something fun. What do you do?",
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
  padding-top: 3rem;
  margin-top: 0rem;
  margin-bottom: 1rem;
  font-size: 2.625rem;
  color: ${styles.colors.white};
  text-align: center;
`;

const H1X = styled.h1`
  font-size: 1.5rem;
  width: 80%;
  margin: 0.5rem auto;
  color: ${styles.colors.gray[30]};
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

const BigText = styled.p<{ color: string }>`
  font-size: 4rem;
  width: 60%;
  top: 50%;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-weight: bold;
  color: ${props => props.color};
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

const ScrollItem = styled(animated.div).attrs(
  (props: any): any => ({
    style: {
      transform: props.transform,
      opacity: props.opacity
    }
  })
)`
  top: 0px;
  position: fixed;
  transition: transform 0.07s cubic-bezier(0.16, 1.03, 1, 1) 0s, opacity 0.07s cubic-bezier(0.16, 1.03, 1, 1) 0s;
  left: 0px;
  width: 100%;
  height: 100%;
`;

const Sphere = styled(ScrollItem)`
  height: 200px;
  width: 200px;
  border-radius: 100px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${styles.colors.primary};
`;

const AboutHeader = styled.div`
  background-color: ${styles.colors.primary};
  width: 100%;
  padding-bottom: 4rem;
`;

const AboutSubHeader = styled.div`
  height: 100px;
  width: 100%;
  background-color: ${styles.colors.gray[20]};
`;

const AboutSubSubHeader = styled.div`
  height: 500px;
  width: 100%;
  background-color: ${styles.colors.white};
`;

const ScrollDownIndicator = () => (
  <div style={{ width: '100%', marginTop: '1rem' }}>
    <H1X>Scroll down to find out!</H1X>
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <FaAngleDownA size={24} color={styles.colors.white} style={{ animationDelay: '-1s' }} className="fade-arrow" />
    </div>
    <div style={{ textAlign: 'center' }}>
      <FaAngleDownA size={24} color={styles.colors.white} style={{ animationDelay: '-0.5s' }} className="fade-arrow" />
    </div>
    <div style={{ textAlign: 'center' }}>
      <FaAngleDownA size={24} color={styles.colors.white} style={{ animationDelay: '0s' }} className="fade-arrow" />
    </div>
    {/* <div style={{ margin: '0 auto', textAlign: 'center' }}>
      <FaAngleDownA style={{ animationDelay: '-1s' }} className="fade-arrow" />
      <FaAngleDownA style={{ animationDelay: '-1s' }} className="fade-arrow" />
      <FaAngleDownA style={{ animationDelay: '-1s' }} className="fade-arrow" />
    </div>
    <div style={{ margin: '0 auto', textAlign: 'center' }}>
      <FaAngleDownA style={{ animationDelay: '-0.5s' }} className="fade-arrow" />
      <FaAngleDownA style={{ animationDelay: '-0.5s' }} className="fade-arrow" />
      <FaAngleDownA style={{ animationDelay: '-0.5s' }} className="fade-arrow" />
    </div>
    <div style={{ margin: '0 auto', textAlign: 'center' }}>
      <FaAngleDownA style={{ animationDelay: '0s' }} className="fade-arrow" />
      <FaAngleDownA style={{ animationDelay: '0s' }} className="fade-arrow" />
      <FaAngleDownA style={{ animationDelay: '0s' }} className="fade-arrow" />
    </div> */}
  </div>
)

const Card = styled.div`
  width: 400px;
  padding: 12px 24px;
  border-radius: 12px;
  color: ${styles.colors.white};
  background-color: ${styles.colors.primary};
`;

const QuestionCard: React.FC<React.PropsWithChildren<{title: string}>> = ({ title, children }) => (
  <div style={{ margin: '0 auto', width: '50%' }}>
    <Card>
      <p style={{ fontWeight: 'bold' }}>{title}</p>
      <p>{children}</p>
    </Card>
  </div>
)

export default function About() {

  const { setLandingPage } = useWhereAreWe();
  const scrollEffectWrap = useRef<HTMLDivElement>(null);
  // const [ scrollPosition, setScrollPosition ] = useState<number>(0);
  // const [ yScroll, setYScroll ] = useState<number>(0);
  const [ yScrollPixels, setYScrollPixels ] = useState<number>(0);

  // const [styles, api] = useSpring(() => ({ config: { friction: 25, tension: 300, mass: 0.5 },to: {transform: `translate3d(0px, 200px, 0px)` }}));

  const headerEffect: NoEaseObject = {
    startValue: 85,
    slope: -0.5
  }

  const subHeaderEffect: NoEaseObject = {
    startValue: 480,
    slope: -1
  }

  const subSubHeaderEffect: NoEaseObject = {
    startValue: 580,
    slope: -1.2
  }

  React.useEffect(() => {
    setLandingPage(true);
    const handleScroll = (ev: Event) => {
      // setYScroll(() => (scrollEffectWrap.current?.scrollTop ?? 0) / (scrollEffectWrap.current?.clientHeight ?? 1));
      // // @ts-ignore
      // console.log(ev.target?.scrollTop ?? 0);
      // // @ts-ignore
      // api.start({ transform: `translate3d(0px, ${noEase(ev.target?.scrollTop ?? 0, titleEffect)}px, 0px)`});
      // @ts-ignore
      setYScrollPixels(() => (ev.target?.scrollTop ?? 0));
    };

    if (scrollEffectWrap.current) scrollEffectWrap.current.onscroll = handleScroll;

    const c = scrollEffectWrap.current;

    return () => {
      setLandingPage(false);
      if (c) c.onscroll = null;
    };
  }, []);

  // We are in effect saying this:
  // Start: [ scroll: 0, value: startValue ]
  // Slope of initial line: initSlope
  // StandStill: [ scroll: scrollToStandAt, value: standStillValue ]
  // Slope of final line: finishSlope
  // End: [ scroll: scrollWithZeroValue: 0 ]

  const titleEasingInfo = useMemo(() => getEasingInfo({
    start: { value: -220, slope: -2 },
    stand: { scroll: 0, value: 80 },
    end: { scroll: 900, slope: -1 }
  }), []);

  const card1EasingInfo = useMemo(() => getEasingInfo({
    start: { value: 1100, slope: -5 },
    stand: { scroll: 300, value: 500 },
    end: { scroll: 700, slope: -3 }
  }), []);

  const card2EasingInfo = useMemo(() => getEasingInfo({
    start: { value: 3000, slope: -5 },
    stand: { scroll: 2200, value: 500 },
    end: { scroll: 2600, slope: -3 }
  }), []);

  const icon1EasingInfo = useMemo(() => getEasingInfo({
    start: { value: 1400, slope: -5 },
    stand: { scroll: 600, value: 500 },
    end: { scroll: 1000, slope: -2 }
  }), []);

  const icon2EasingInfo = useMemo(() => getEasingInfo({
    start: { value: 3400, slope: -5 },
    stand: { scroll: 2600, value: 500 },
    end: { scroll: 3500, slope: -2 }
  }), []);

  return (
    <>
      <ScrollEffectWrap ref={scrollEffectWrap}>
        {/* </animated.div> */}
        <ScrollEffectInner space={4}>
          <ScrollItem transform={`translate(0px, ${noEase(yScrollPixels, headerEffect)}px)`} >
            <AboutHeader>
              <H1>What is Reserveroo?</H1>
              <IconRow />
              <ScrollDownIndicator />
            </AboutHeader>
          </ScrollItem>
          <ScrollItem transform={`translate(0px, ${noEase(yScrollPixels, subHeaderEffect)}px)`}>
            <AboutSubHeader />
          </ScrollItem>
          <ScrollItem transform={`translate(0px, ${noEase(yScrollPixels, subSubHeaderEffect)}px)`}>
            <AboutSubSubHeader />
          </ScrollItem>
          <ScrollItem transform={`translate(0px, ${easeInOut(yScrollPixels, icon1EasingInfo)}px)`}>
            <div style={{ margin: '0 auto', width: '50%', textAlign: 'right' }}>
              <FaUserFriends color={styles.colors.gray[20]} size={300} />
            </div>
          </ScrollItem>
          <ScrollItem transform={`translate(0px, ${easeInOut(yScrollPixels, icon2EasingInfo)}px)`}>
            <div style={{ margin: '0 auto', width: '50%', textAlign: 'right' }}>
              <FaSearch color={styles.colors.gray[20]} size={300} />
            </div>
          </ScrollItem>
          <ScrollItem transform={`translate(0px, ${easeInOut(yScrollPixels, card1EasingInfo)}px)`}>
            <QuestionCard title={"Picture this:"}>{questions[0].question}</QuestionCard>
          </ScrollItem>
          <ScrollItem transform={`translate(0px, ${easeInOut(yScrollPixels, card2EasingInfo)}px)`}>
            <QuestionCard title={"Picture this:"}>{questions[1].question}</QuestionCard>
          </ScrollItem>
        </ScrollEffectInner>
      </ScrollEffectWrap>
    </>
  );
}
