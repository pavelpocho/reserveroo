import styled from "styled-components";

export const WidthRestrictor = styled.div<{ width?: string }>`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 550px) {
    padding: 0 1rem;
  }
  box-sizing: border-box;
  max-width: ${props => props.width ?? '968px'};
`;
