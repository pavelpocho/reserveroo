import styled from "styled-components";

export const ScrollEffectWrap = styled.div`
  position: fixed;
  top: 85x;
  transition: opacity 0.5s;
  left: 0;
  overflow-y: scroll;
  height: calc(100vh - 90px);
  width: 100vw;
`;

export const ScrollEffectInner = styled.div<{ space: number }>`
  height: ${props => props.space * 100}%;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 5%;
  width: 90%;
`;

const zLoopStart = (leftBound: number, rightBound: number, setupObject: EffectSetupObject, loopCount: number): { z: number, x: number } => {
  // Assume they bracket the value

  const { start, stand } = setupObject;

  const a = (one: number, two: number) => (one + two) / 2;

  const getXOfCorrectSlope = (z: number) => (stand.scroll - z*Math.log(-z*start.slope));
  const startLineFn = (x: number) => (start.value + start.slope * x);
  const firstFn = (x: number, z: number) => (Math.exp(-(x-stand.scroll)/z) + stand.value - 1);

  loopCount += 1;
  if (loopCount < 400) {
    const midBound = a(leftBound, rightBound);
    const midBoundXOfCorrectSlope = getXOfCorrectSlope(midBound);
    const midBoundLineY = startLineFn(midBoundXOfCorrectSlope);
    const midBoundY = firstFn(midBoundXOfCorrectSlope, midBound);
    
    const newLeftBound = midBoundY > midBoundLineY ? midBound : leftBound;
    const newRightBound = midBoundY < midBoundLineY ? midBound : rightBound;
    return zLoopStart(newLeftBound, newRightBound, setupObject, loopCount);
  }
  else {
    return {z: a(leftBound, rightBound), x: getXOfCorrectSlope(a(leftBound, rightBound))};
  }
}

const zLoopEnd = (leftBound: number, rightBound: number, setupObject: EffectSetupObject, loopCount: number): { z: number, x: number } => {
  // Assume they bracket the value

  const { stand, end } = setupObject;

  const a = (one: number, two: number) => (one + two) / 2;

  const getXOfCorrectSlope = (z: number) => (stand.scroll + z*Math.log(-z*end.slope));
  const endLineFn = (x: number) => ((-end.scroll + x) * end.slope);
  const secondFn = (x: number, z: number) => (-Math.exp((x-stand.scroll)/z) + stand.value + 1);

  loopCount += 1;
  if (loopCount < 400) {
    const midBound = a(leftBound, rightBound);
    const midBoundXOfCorrectSlope = getXOfCorrectSlope(midBound);
    const midBoundLineY = endLineFn(midBoundXOfCorrectSlope);
    const midBoundY = secondFn(midBoundXOfCorrectSlope, midBound);
    
    const newLeftBound = midBoundY < midBoundLineY ? midBound : leftBound;
    const newRightBound = midBoundY > midBoundLineY ? midBound : rightBound;
    return zLoopEnd(newLeftBound, newRightBound, setupObject, loopCount);
  }
  else {
    return {z: a(leftBound, rightBound), x: getXOfCorrectSlope(a(leftBound, rightBound))};
  }
}


/**
 * 
 * @param startValue Starting position of element on screen (px from top)
 * @param standStillValue Position at which element "stops" on screen (px from top)
 * @param scrollToStandAt Value of scroll at which element "stops" (px from top)
 * @param initSlope Speed of element movement before exp curves
 * @param finishSlope Speed of element movement after exp curves
 * @returns X value at which transition from straight to exp line happens and Z the easing parameter
 */
export const getEasingFunctionXandZ = (setupObject: EffectSetupObject): EffectInfo => {

  const { z: z1, x: x1 } = zLoopStart(10, 2000, setupObject, 0);
  const { z: z2, x: x2 } = zLoopEnd(10, 2000, setupObject, 0);
  return { setupObject, x1, x2, z1, z2 } ;
}

export const easeInOut = (scroll: number, effectInfo: EffectInfo) => {
  const { start, stand, end } = effectInfo.setupObject;
  const { x1, x2, z1, z2 } = effectInfo;
  if (scroll < stand.scroll) {
    if (scroll < x1) return start.value + start.slope * scroll;
    else return (Math.exp(-(scroll-stand.scroll)/z1) + stand.value - 1);
  }
  else {
    if (scroll > x2) return end.slope * (-end.scroll + scroll);
    else return (-(Math.exp((scroll-stand.scroll)/z2)) + stand.value + 1);
  }
}

export const easeIn = (scroll: number, effectInfo: EffectInfo) => {
  const { start, stand } = effectInfo.setupObject;
  const { x1, z1 } = effectInfo;
  if (scroll < x1) return start.value + start.slope * scroll;
  else return (Math.exp(-(scroll-stand.scroll)/z1) + stand.scroll - 1);
}

export const easeOut = (scroll: number, effectInfo: EffectInfo) => {
  const { stand, end } = effectInfo.setupObject;
  const { x2, z2 } = effectInfo;
  if (scroll > x2) return end.slope * (-end.scroll + scroll);
  else return (-(Math.exp((scroll-stand.scroll)/z2)) + stand.value + 1);
}

export const noEase = (scroll: number, setupObject: NoEaseObject) => {
  const { startValue, slope } = setupObject;
  return startValue + slope * scroll;
}

export interface EffectSetupObject {
  start: {
    value: number,
    slope: number
  },
  stand: {
    scroll: number,
    value: number
  },
  end: {
    scroll: number
    slope: number
  }
}

export interface EffectInfo {
  setupObject: EffectSetupObject,
  x1: number,
  x2: number,
  z1: number,
  z2: number
}

export interface NoEaseObject {
  startValue: number,
  slope: number
}