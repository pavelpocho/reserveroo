import styled from "styled-components"
import BaseballIcon from "~/assets/icons/Baseball";
import BowlingBallIcon from "~/assets/icons/BowlingBall";
import DumbellIcon from "~/assets/icons/Dumbell";
import FireFlameCurvedIcon from "~/assets/icons/FireFlameCurved";
import FutbolIcon from "~/assets/icons/Futbol";
import GolfBallTeeIcon from "~/assets/icons/GolfBallTee";
import HeartIcon from "~/assets/icons/Heart";
import PersonSwimmingIcon from "~/assets/icons/PersonSwimming";
import SpaIcon from "~/assets/icons/Spa";
import TableTennisPaddleBallIcon from "~/assets/icons/TableTennisPaddleBall";
import VolleyballIcon from "~/assets/icons/Volleyball";
import WeightHangingIcon from "~/assets/icons/WeightHanging";
import { styles } from "~/constants/styles";

const Wrap = styled.div`
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  width: 150%;
  height: 100%;
  background-image: linear-gradient(to right, ${styles.colors.primary}FF, ${styles.colors.primary}00, ${styles.colors.primary}FF);
`;

const ListItem = styled.div`
  display: flex;
  gap: 0.25rem;
  &>svg {
    flex-shrink: 0;
  }
`;

export const IconRow = () => <Wrap>
  <Overlay />
  {[...Array(4).keys()].map(i => <ListItem key={i}>
    <TableTennisPaddleBallIcon height={'1.64rem'} fill={styles.colors.gray[70]} />
    <FireFlameCurvedIcon height={'1.64rem'} fill={styles.colors.gray[70]} />
    <BowlingBallIcon height={'1.64rem'} fill={styles.colors.gray[70]} />
    <DumbellIcon height={'1.64rem'} fill={styles.colors.gray[70]} />
    <VolleyballIcon height={'1.64rem'} fill={styles.colors.gray[70]} />
    <GolfBallTeeIcon height={'1.64rem'} fill={styles.colors.gray[70]} />
    <SpaIcon height={'1.64rem'} fill={styles.colors.gray[70]} />
    <FutbolIcon height={'1.64rem'} fill={styles.colors.gray[70]} />
    <HeartIcon height={'1.64rem'} fill={styles.colors.gray[70]} />
    <WeightHangingIcon height={'1.64rem'} fill={styles.colors.gray[70]} />
    <BaseballIcon height={'1.64rem'} fill={styles.colors.gray[70]} />
    <PersonSwimmingIcon height={'1.64rem'} fill={styles.colors.gray[70]} />
  </ListItem>)}
</Wrap>