import styled from "styled-components";

export const ScrollEffectWrap = styled.div`
  position: fixed;
  top: 90px;
  left: 0;
  overflow-y: scroll;
  height: calc(100vh - 90px);
  width: 100vw;
`;

export const ScrollEffectInner = styled.div<{ space: number }>`
  height: ${props => props.space * 100}%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const zLoopStart = (leftBound: number, rightBound: number, setupObject: EffectSetupObject, loopCount: number): { z: number, x: number } => {
  // Assume they bracket the value

  const { scrollToStandAt, initSlope, startValue, standStillValue } = setupObject;

  const a = (one: number, two: number) => (one + two) / 2;

  const getXOfCorrectSlope = (z: number) => (scrollToStandAt - z*Math.log(-z*initSlope));
  const startLineFn = (x: number) => (startValue + initSlope * x);
  const firstFn = (x: number, z: number) => (Math.exp(-(x-scrollToStandAt)/z) + standStillValue - 1);

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

  const { scrollToStandAt, finishSlope, scrollWithZeroValue, standStillValue } = setupObject;

  const a = (one: number, two: number) => (one + two) / 2;

  const getXOfCorrectSlope = (z: number) => (scrollToStandAt + z*Math.log(-z*finishSlope));
  const endLineFn = (x: number) => ((-scrollWithZeroValue + x) * finishSlope);
  const secondFn = (x: number, z: number) => (-Math.exp((x-scrollToStandAt)/z) + standStillValue + 1);

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
export const useEasingFunctionXandZ = (setupObject: EffectSetupObject) => {

  const { z: z1, x: x1 } = zLoopStart(10, 2000, setupObject, 0);
  const { z: z2, x: x2 } = zLoopEnd(10, 2000, setupObject, 0);
  return { x1, x2, z1, z2 } ;
}

export const easeInOut = (scroll: number, setupObject: EffectSetupObject, z1: number, z2: number, x1: number, x2: number) => {
  const { scrollToStandAt, standStillValue, startValue, initSlope, finishSlope, scrollWithZeroValue } = setupObject;
  if (scroll < scrollToStandAt) {
    if (scroll < x1) return startValue + initSlope * scroll;
    else return (Math.exp(-(scroll-scrollToStandAt)/z1) + standStillValue - 1);
  }
  else {
    if (scroll > x2) return finishSlope * (-scrollWithZeroValue + scroll);
    else return (-(Math.exp((scroll-scrollToStandAt)/z2)) + standStillValue + 1);
  }
}

export const easeIn = (scroll: number, setupObject: EffectSetupObject, z1: number, z2: number, x1: number, x2: number) => {
  const { scrollToStandAt, standStillValue, startValue, initSlope } = setupObject;
  if (scroll < x1) return startValue + initSlope * scroll;
  else return (Math.exp(-(scroll-scrollToStandAt)/z1) + standStillValue - 1);
}

export const easeOut = (scroll: number, setupObject: EffectSetupObject, z1: number, z2: number, x1: number, x2: number) => {
  const { scrollToStandAt, standStillValue, finishSlope, scrollWithZeroValue } = setupObject;
  if (scroll > x2) return finishSlope * (-scrollWithZeroValue + scroll);
  else return (-(Math.exp((scroll-scrollToStandAt)/z2)) + standStillValue + 1);
}

export const noEase = (scroll: number, setupObject: NoEaseObject) => {
  const { startValue, slope } = setupObject;
  return startValue + slope * scroll;
}

export interface EffectSetupObject {
  startValue: number,
  standStillValue: number,
  scrollToStandAt: number,
  initSlope: number,
  finishSlope: number,
  scrollWithZeroValue: number
}

export interface NoEaseObject {
  startValue: number,
  slope: number
}