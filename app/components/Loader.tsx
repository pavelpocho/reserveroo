import React, { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { styles } from "~/constants/styles";
import { useLangs } from "~/contexts/langsContext";

interface LoaderProps {
  show: boolean
}

const Wrap = styled.div<{ show: boolean }>`
  position: fixed;
  transition: opacity 0.1s ease-out, transform 0.2s cubic-bezier(0.33, 1, 0.68, 1);
  opacity: ${props => props.show ? '1' : '0'};
  transform: translateY(${props => props.show ? '0' : '4.5'}rem);
  bottom: 1rem;
  right: 1rem;
  border-radius: 0.6rem;
  box-shadow: ${styles.shadows[0]};
  display: flex;
  justify-content: center;
  padding: 1.5rem;
  gap: 1.5rem;
`;

const Text = styled.p`
  color: ${styles.colors.gray[120]};
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(720deg); }
`;

const Symbol = styled.div`
  height: 0.9rem;
  width: 0.9rem;
  background-color: ${styles.colors.action};
  border-radius: 0.2rem;
  animation-name: ${spin};
  animation-duration: 1.2s;
  animation-delay: 0.9s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
`;

export const Loader: React.FC<LoaderProps> = ({ show }: LoaderProps) => {

  const ref = useRef<HTMLDivElement>(null);
  const { translations: l } = useLangs();
  const [textIndex, setTextIndex] = React.useState(0);

  React.useEffect(() => {
    if (!show) {
      setTimeout(() => {
        if (ref.current) ref.current.style.visibility = 'hidden';
      }, 200);
    }
    else {
      if (ref.current) {
        setTextIndex(Math.floor(Math.random() * 6));
        ref.current.style.visibility = '';
      }
    }
  }, [show])

  return <Wrap show={show} ref={ref}>
    <Symbol></Symbol>
    <Text>{l.loadingText[textIndex]}...</Text>
  </Wrap>
}