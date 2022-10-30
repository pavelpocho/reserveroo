import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Link } from "@remix-run/react";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
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
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleDown, FaArrowDown, FaBackward, FaBowlingBall, FaBroom, FaCalendarAlt, FaCaretDown, FaEye, FaGolfBall, FaMailBulk, FaPhone, FaPhoneSlash, FaQuestion, FaQuestionCircle, FaRedo, FaRedoAlt, FaSadCry, FaSadTear, FaSearch, FaSwimmer, FaTableTennis, FaUserFriends, FaVolleyballBall, FaWeight } from "react-icons/fa";
import { easeIn, easeInOut, easeOut, EffectSetupObject, noEase, NoEaseObject, ScrollEffectInner, ScrollEffectWrap, getEasingFunctionXandZ as getEasingInfo } from "~/components/scroll-effects";
import { useInterval } from "~/components/scroll-effects/useInterval";
import { useSpring, animated } from 'react-spring'
import { config } from "aws-sdk";
import book from '../assets/images/book.png';
import search from '../assets/images/search.png';
import details from '../assets/images/details.png';

const questions = [
  {
    title: "Imagine you are somewhere new with your friend and want to do something fun.",
    question: "A game of tennis, or perhaps a round of billiards. Whatever you desire.",
    icon: FaUserFriends
  },
  {
    title: "You can try just walking into a billiard bar.",
    question: "But it could be full. Or empty and closed.",
    icon: FaSearch
  },
  {
    title: "Or find one of the three local tennis places.",
    question: "Except they all require bookings. And no one picks up the phone.",
    icon: FaEye
  },
  {
    title: "We think it should be easier.",
    question: "",
    icon: FaQuestion
  },
  {
    title: "Reserveroo will let you see all the local leisure activities. Wherever you happen to be.",
    question: "",
    icon: FaCalendarAlt
  },
  {
    title: "And you can book with a single click.",
    question: "",
    icon: FaQuestionCircle
  },
  {
    title: "No learning the local way of doing things.",
    question: "",
    icon: FaPhone
  },
  {
    title: "No phone calls required.",
    question: "",
    icon: FaPhoneSlash
  },
  {
    title: "What now?",
    question: "Keep on trying? You hate calling people...",
    icon: FaRedoAlt
  },
  {
    title: "This is not fun..",
    question: "So what? Email them?",
    icon: FaMailBulk
  },
  {
    title: "Maybe?",
    question: "No that's pointless, they won't reply in time...",
    icon: FaSadCry
  },
  {
    title: "Hold on a second!",
    question: "This all seems needlessly complicated.",
    icon: FaBackward
    
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
  padding-top: 12vh;
  margin-top: 0rem;
  margin-bottom: 1vh;
  font-size: min(6vh, 8vw);
  color: ${styles.colors.white};
  text-align: center;
`;

const H1X = styled.h1`
  font-size: min(3vh, 4vw);;
  width: 80%;
  margin: 1vh auto;
  color: ${styles.colors.gray[30]};
  text-align: center;
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
  (props: any): any => {
    const sp = props.transform.split(',')[1].split('px')[0];
    if (sp < (props.extendPresence ? 2000 : 1000) && sp > (props.extendPresence ? -1200 : -600)) {
      return {
        style: {
          transform: props.transform,
          opacity: props.opacity,
          transition: 'transform 0.05s linear 0s, opacity 0.05s linear 0s'
        }
      }
    } else return {
      style: {
        display: 'none'
      }
    }
  }
)`
  top: 0px;
  z-index: ${props => props.extendedPresence ? '5' : ''};
  ${ props => props.onlyDesktop ? `
    @media(max-width: 968px) {
      opacity: 0.25;
    }
  ` : ``};
  position: fixed;
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
  height: 30vh;
  width: 100%;
  box-shadow: 0px -2px 24px -12px #33333399;
  background-color: ${styles.colors.gray[20]};
`;

const AboutSubSubHeader = styled.div`
  height: 80%;
  width: 100%;
  top: 0;
  position: absolute;
  background-color: ${styles.colors.white};
`;

const PurpleSection = styled.div`
  height: 55vh;
  width: 100%;
  top: 0;
  position: absolute;
  background-color: ${styles.colors.primary};
`;

const ScrollDownIndicator = ({ screenHeight }: {screenHeight: number}) => (
  <div style={{ width: '100%', marginTop: '5vh' }}>
    <H1X>Scroll down to find out!</H1X>
    <div style={{ textAlign: 'center', marginTop: '2vh' }}>
      <FaAngleDownA size={24 / 1080 * screenHeight} color={styles.colors.white} style={{ animationDelay: '-1s' }} className="fade-arrow" />
    </div>
    <div style={{ textAlign: 'center' }}>
      <FaAngleDownA size={24 / 1080 * screenHeight} color={styles.colors.white} style={{ animationDelay: '-0.5s' }} className="fade-arrow" />
    </div>
    <div style={{ textAlign: 'center' }}>
      <FaAngleDownA size={24 / 1080 * screenHeight} color={styles.colors.white} style={{ animationDelay: '0s' }} className="fade-arrow" />
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
  padding: 1.2vh 24px;
  border-radius: 12px;
  max-width: 576px;
  @media (max-width: 1004px) {
    margin: 0 auto;
  }
`;

const HowItWorksLineWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  @media (max-width: 1004px) {
    flex-direction: column;
  }
`;

const HowDoesItWorkItem = (props: { title: string, imgSrc: string, back: boolean, screenWidth: number }) => <HowItWorksLineWrap style={props.back ? {
  background: 'linear-gradient(to right, #f1f1f100, #f1f1f1ff, #f1f1f100)'
} : {}}>
  <h4 style={{ fontSize: 'max(min(1.5vh, 3vw), 1rem)', textAlign: props.screenWidth > 600 ? 'unset' : 'center', padding: '1.5rem' }}>{props.title}</h4>
  <img style={{ boxShadow: styles.shadows[0] }} width={props.screenWidth > 600 ? 560 : props.screenWidth * 0.85} src={props.imgSrc} alt={''}/>
</HowItWorksLineWrap>

const HowItWorksWrap = styled.div`
  max-width: 968px;
  margin: 0 auto;
  @media (max-width: 1004px) {
    margin-top: 10rem;
  }
`

const HowItWorksTitle = styled.h3`
  font-size: 1.6rem;
  @media (max-width: 1004px) {
    text-align: center;
  }
`

const QuestionTitle = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: max(min(4vh, 6vw), 1.5rem);
  margin-bottom: 0.5rem;
  padding: 0 1.5rem;
  color: ${styles.colors.primary};
`;

const SecondScrollItemContainer = styled.div`
  display: flex;
  max-width: 936px;
  margin: 5vh auto;
  position: relative;
  z-index: 2;
  align-items: center;
  @media (max-width: 1004px) {
    justify-content: center;
  }
`

const ContactUs = styled.a`
  background-color: ${styles.colors.action};
  color: ${styles.colors.black};
  padding: 0.6rem 0.8rem;
  border-radius: 0.25rem;
  display: flex;
  width: max-content;
  margin: 2rem auto;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  text-decoration: none;
`;

const QuestionInsideCard = styled.p`
  font-size: max(min(1.5vh, 2.5vw), 0.8rem);
  font-weight: 400;
  margin-top: 0.5rem;
  color: ${styles.colors.white};
`

const TitleInsideCard = styled.p`
  font-weight: bold;
  font-size: max(min(3vh, 5vw), 1.3rem);
  margin-bottom: 0.5rem;
  @media (max-width: 420px) {
    margin-bottom: -0.5rem;
  }
  color: ${styles.colors.white};
`

const QuestionCard: React.FC<React.PropsWithChildren<{title: string, white: boolean}>> = ({ title, children, white }) => {

  return <div style={{ margin: '14vh auto', maxWidth: '938px', zIndex: 2, position: 'relative', display: 'flex' }}>
    <Card>
      <p style={{ fontWeight: 'bold', fontSize: 'max(min(4vh, 6vw), 1.5rem)', marginBottom: '1vh', color: white ? styles.colors.white : styles.colors.primary }}>{title}</p>
      <p style={{ fontSize: 'max(min(2vh, 3vw), 1rem)', fontWeight: '400', marginTop: '1vh', color: white ? styles.colors.white : styles.colors.black }}>{children}</p>
    </Card>
  </div>
}

export default function About() {

  const { setLandingPage } = useWhereAreWe();
  const scrollEffectWrap = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const [ screenHeight, setScreenHeight ] = useState<number>(-1);
  const [ screenWidth, setScreenWidth ] = useState<number>(-1);
  // const [ scrollPosition, setScrollPosition ] = useState<number>(0);
  // const [ yScroll, setYScroll ] = useState<number>(0);
  const [ yScrollPixels, setYScrollPixels ] = useState<number>(0);

  const howItWorksRef = useRef<HTMLDivElement>(null);

  // Convert screen height percent to pixels and account for topbar (90px)
  const gSHP = (fraction: number, sh: number) => sh * fraction + 90;

  // const [styles, api] = useSpring(() => ({ config: { friction: 25, tension: 300, mass: 0.5 },to: {transform: `translate3d(0px, 200px, 0px)` }}));

  const headerEffect: NoEaseObject = {
    startValue: 85,
    slope: -0.5
  }

  const purpleSectionEffect: NoEaseObject = {
    startValue: gSHP(1.6, screenHeight),
    slope: -1.2
  }

  // All the +90 here is to account for the topbar!
  const subHeaderEasing = useMemo(() => getEasingInfo({
    start: { value: gSHP(0.5, screenHeight), slope: -1.2 },
    stand: { scroll: gSHP(0.8, screenHeight), value: gSHP(-0.1, screenHeight) },
    end: { scroll: gSHP(1, screenHeight), slope: -1 }
  }), [screenHeight]);

  const subSubHeaderEasing = useMemo(() => getEasingInfo({
    start: { value: gSHP(0.68, screenHeight), slope: -1.7 },
    stand: { scroll: gSHP(0.4, screenHeight), value: gSHP(0.2, screenHeight) },
    end: { scroll: gSHP(0.82, screenHeight), slope: -1.7 }
  }), [screenHeight]);

  const subSubHeaderBlobEasing = useMemo(() => getEasingInfo({
    start: { value: gSHP(0.92, screenHeight), slope: -1.8 },
    stand: { scroll: gSHP(0.5, screenHeight), value: gSHP(0.2, screenHeight) },
    end: { scroll: gSHP(0.82, screenHeight), slope: -2 }
  }), [screenHeight]);

  const subSubHeaderIconsEasing = useMemo(() => getEasingInfo({
    start: { value: gSHP(0.96, screenHeight), slope: -1.9 },
    stand: { scroll: gSHP(0.5, screenHeight), value: gSHP(0.2, screenHeight) },
    end: { scroll: gSHP(0.82, screenHeight), slope: -2.1 }
  }), [screenHeight]);

  // const purpleSectionIconEasings = useMemo(() => ([...Array(10).keys()].map((i) => getEasingInfo({
  //   start: { value: gSHP(1.6, screenHeight) + ((Math.random() - 0.5) * 0.8), slope: -1.2 },
  //   stand: { scroll: gSHP(1.3, screenHeight), value: gSHP(0, screenHeight) },
  //   end: { scroll: gSHP(1.5, screenHeight) + ((Math.random() - 0.5) * 0.2), slope: -3.1 + ((Math.random() - 0.5) * 0.8) }
  // }))), [screenHeight]);

  const purpleSectionIconEasings = useMemo(() => ([...Array(10).keys()].map((i): NoEaseObject => ({
    startValue: gSHP(1.4 + ((Math.random() - 0.5) * 0.02), screenHeight),
    slope: -1.2 + ((Math.random() - 0.5) * 0.3)
  }))), [screenHeight]);

  const explanationSection = useMemo(() => getEasingInfo({
    start: { value: gSHP(1.4, screenHeight), slope: -1 },
    stand: { scroll: gSHP(1.7, screenHeight), value: gSHP(0.1, screenHeight) },
    end: { scroll: gSHP(1.9, screenHeight), slope: -1.2 }
  }), [screenHeight]);

  React.useEffect(() => {
    setLandingPage(true);
    setScreenHeight(window.innerHeight);
    setScreenWidth(window.innerWidth);
    const handleScroll = (ev: Event) => {
      if (requestRef.current != null) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      requestAnimationFrame(() => {
        // @ts-ignore
        setYScrollPixels(() => (ev.target?.scrollTop ?? 0));
      })
    };
    if (scrollEffectWrap.current) scrollEffectWrap.current.onscroll = handleScroll;

    const c = scrollEffectWrap.current;

    window.onresize = e => {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    };

    return () => {
      setLandingPage(false);
      if (c) c.onscroll = null;
    };
  }, []);

  const randomPositions = useMemo(() => ([
    [0, 0, 20]
  ].concat([...Array(9).keys()].map(i =>
    [Math.random() * 300, Math.random() * 200 + 10, Math.random() * 60 + 30, (Math.random() - 0.5) * 2]
  ))), []);

  const howItWorks: NoEaseObject = {
    startValue: gSHP(2.5, screenHeight),
    slope: -1
  }

  function getSpaceByScreenWidth (screenHeight: number, screenWidth: number): number {
    if (screenWidth > 1005) {
      return 4 + (screenHeight < 900 ? 0.5 : 0);
    }
    if(screenWidth < 420) {
      return 5.4 + (screenHeight < 900 ? 0.5 : 0);
    }
    return 4.6 + (screenHeight < 900 ? 0.5 : 0);
  }

  return (
    <>
      <ScrollEffectWrap style={ screenHeight == -1 ? { opacity: 0 } : { opacity: 1 }} ref={scrollEffectWrap}>
        {/* </animated.div> */}
        <ScrollEffectInner space={(noEase(0, howItWorks) + (screenWidth < 1005 ? 2000 : 1400)) / screenHeight}>
        </ScrollEffectInner>
        <ScrollItem transform={`translate(0px, ${noEase(yScrollPixels, headerEffect)}px)`} >
          <AboutHeader>
            <H1>What is Reserveroo?</H1>
            <div style={{ transform: `scale(${screenHeight / 1080 * 1.5}` }}>
              <IconRow />
            </div>
            <ScrollDownIndicator screenHeight={screenHeight} />
          </AboutHeader>
        </ScrollItem>
        <ScrollItem transform={`translate(0px, ${easeInOut(yScrollPixels, subHeaderEasing)}px)`}>
          <AboutSubHeader />
        </ScrollItem>
        <ScrollItem transform={`translate(0px, ${easeInOut(yScrollPixels, subSubHeaderEasing)}px)`}>
          <QuestionCard white={false} title={questions[0].title}>{questions[0].question}</QuestionCard>
          <AboutSubSubHeader />
        </ScrollItem>
        <ScrollItem onlyDesktop={true} transform={`translate(0px, ${easeInOut(yScrollPixels, subSubHeaderBlobEasing) + (screenWidth < 936 ? 200 : 0)}px)`}>
          <div style={{ position: 'relative', maxWidth: '936px', margin: '12rem auto' }}>
            <div style={{ position: 'absolute', right: screenWidth < 936 ? '25%' : '0', top: '0', width: '322px' }}>
              <svg width="322" height="260" viewBox="0 0 322 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M298.961 52.0567C267.327 19.5504 237.601 21.3634 192.442 14.8109C192.442 14.8109 106.606 1.36085 77.9936 1.36101C49.3814 1.36116 9.73876 -4.50162 4.22285 31.0199C-1.34129 66.8519 0.392164 55.3865 8.70401 90.6821C19.4841 136.459 -11.2671 162.591 16.288 200.695C40.3495 233.968 54.8386 244.056 94.5404 254.495C140.747 266.643 178.225 252.4 222.088 233.458C273.136 211.413 290.801 196.691 306.89 143.447C320.644 97.9325 332.117 86.1257 298.961 52.0567Z" fill="#2E294E" stroke="#F1F1F1"/>
              </svg>
            </div>
          </div>
        </ScrollItem>
        <ScrollItem onlyDesktop={true} transform={`translate(0px, ${easeInOut(yScrollPixels, subSubHeaderIconsEasing) + (screenWidth < 936 ? 200 : 0)}px)`}>
          <div style={{ position: 'relative', maxWidth: '936px', margin: '12rem auto' }}>
            <div style={{ position: 'absolute', right: screenWidth < 936 ? '25%' : '0', top: '0', width: '322px' }}>
              <FaVolleyballBall color={styles.colors.white} size={54} style={{ position: 'absolute', top: '35px', left: '40px' }} />
              <FaTableTennis color={styles.colors.white} size={54} style={{ position: 'absolute', top: '95px', left: '110px' }} />
              <FaGolfBall color={styles.colors.white} size={54} style={{ position: 'absolute', top: '155px', left: '180px' }} />
              <FaSwimmer color={styles.colors.white} size={54} style={{ position: 'absolute', top: '165px', left: '65px' }} />
              <FaBowlingBall color={styles.colors.white} size={54} style={{ position: 'absolute', top: '55px', left: '200px' }} />
            </div>
          </div>
        </ScrollItem>
        <ScrollItem transform={`translate(0px, ${easeInOut(yScrollPixels, explanationSection)}px)`}>
          <div style={{ margin: '4rem auto 4rem', maxWidth: '936px' }}>
            <QuestionTitle>{questions[4].title}</QuestionTitle>
            <QuestionTitle>{questions[5].title}</QuestionTitle>
            <QuestionTitle>{questions[6].title}</QuestionTitle>
            <QuestionTitle>{questions[7].title}</QuestionTitle>
          </div>
          <IconRow invertColors={true} />
        </ScrollItem>
        <ScrollItem extendPresence={true} transform={`translate(0px, ${noEase(yScrollPixels, purpleSectionEffect)}px)`}>
          <SecondScrollItemContainer>
            <div style={{ flexShrink: '1', maxWidth: '786px' }}>
              <Card>
                <TitleInsideCard>{questions[1].title}</TitleInsideCard>
                <QuestionInsideCard>{questions[1].question}</QuestionInsideCard>
              </Card>
              <Card>
                <TitleInsideCard>{questions[2].title}</TitleInsideCard>
                <QuestionInsideCard>{questions[2].question}</QuestionInsideCard>
              </Card>
              <Card>
                <TitleInsideCard>{questions[3].title}</TitleInsideCard>
                <QuestionInsideCard>{questions[3].question}</QuestionInsideCard>
              </Card>
            </div>
          </SecondScrollItemContainer>
          <PurpleSection />
        </ScrollItem>
        { [...Array(10).keys()].map(i => (
          <ScrollItem onlyDesktop={true} key={i} transform={`translate(0px, ${noEase(yScrollPixels, purpleSectionIconEasings[i])}px)`}>
            <div style={{ position: 'relative', maxWidth: '936px', margin: '12rem auto' }}>
              <div style={{ position: 'absolute', right: '0', top: '0', width: '322px' }}>
              <FaQuestionCircle size={randomPositions[i][2]} color={styles.colors.white} style={{ transform: `rotate(${randomPositions[i][3] / Math.PI * 180}deg)`, position: 'absolute', top: `${randomPositions[i][1]}`, left: `${randomPositions[i][0]}px` }} />
              </div>
            </div>
          </ScrollItem>
        )) }
        <ScrollItem ref={howItWorksRef} extendPresence={true} transform={`translate(0px, ${noEase(yScrollPixels, howItWorks)}px)`}>
          <HowItWorksWrap>
            <HowItWorksTitle>How does it work?</HowItWorksTitle>
            <HowDoesItWorkItem screenWidth={screenWidth} back={false} title={'1. Find your favourite activity'} imgSrc={search} />
            <HowDoesItWorkItem screenWidth={screenWidth} back={true} title={'2. Check out all the details'} imgSrc={details} />
            <HowDoesItWorkItem screenWidth={screenWidth} back={false} title={'3. Book and enjoy!'} imgSrc={book} />
          </HowItWorksWrap>
          <div style={{
            height: '2px',
            borderRadius: '1px',
            maxWidth: '968px',
            width: '100%',
            margin: '4rem auto',
            backgroundColor: styles.colors.gray[90]
          }} ></div>
          <h2 style={{ maxWidth: '968px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center'}}>Would you like to list your place on Reserveroo?</h2>
          <p style={{
            fontSize: '1rem',
            fontWeight: 'bold',
            textAlign: 'center',
            margin: '2rem auto',
            padding: '0 1rem'
          }}>Contact us at: reserveroo@reserveroo.co.uk</p>
        </ScrollItem>
      </ScrollEffectWrap>
    </>
  );
}