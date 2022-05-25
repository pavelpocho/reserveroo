import { ParallaxLayer } from '@react-spring/parallax'
import React from 'react'
import styled from 'styled-components';
import { styles } from '~/constants/styles';

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

function ParallaxLayerComponent({question, offset, factor, speed}) {
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
      <Wrapper>
       {question}
      </Wrapper>
    </ParallaxLayer>
  );
}

export default ParallaxLayerComponent