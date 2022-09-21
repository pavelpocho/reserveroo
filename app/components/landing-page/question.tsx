import { ParallaxLayer } from '@react-spring/parallax'
import React from 'react'
import styled from 'styled-components';
import { styles } from '~/constants/styles';

const Wrapper = styled.h1<{offset: number}>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${styles.shadows[1]};
  width: 300px;
  padding: 2rem;
  border-radius: 0.375rem;
  color: ${props => props.offset % 2 === 0 ? styles.colors.primary : styles.colors.white};
  background-color: ${props => props.offset % 2 === 0 ? styles.colors.gray : styles.colors.primary};
`;

interface Question {
  question: string;
  offset: number;
  factor: number;
  speed: number;
}

const Question: React.FC<Question> = ({ offset, factor, speed, question }) => {
  return (
    <ParallaxLayer
      offset={offset}
      factor={factor}
      speed={speed}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: styles.colors.busy,
      }}
    >
      <Wrapper offset={offset}>
       {question}
      </Wrapper>
    </ParallaxLayer>
  );
}

export default Question