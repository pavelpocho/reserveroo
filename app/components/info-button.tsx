import { useState } from "react";
import styled from "styled-components";
import CircleInfoIcon from "~/assets/icons/CircleInfo";
import { styles } from "~/constants/styles";

const InfoButtonEl = styled.button`
  background-color: transparent;
  border: none;
  flex-shrink: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 1.6rem;
  position: relative;
`;

const Tooltip = styled.p<{ bottom: boolean, left: boolean }>`
  position: absolute;
  left: 50%;
  max-width: 30ch;
  background-color: ${styles.colors.white};
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${styles.colors.gray[20]};
  ${props => props.bottom ? 'top: 1rem' : 'bottom: 1rem'};
  z-index: 2;
  font-weight: 500;
  transition: opacity 0.2s;
  transform: translateX(-50%);
  &::after {
    height: 0.5rem;
    width: 0.5rem;
    background-color: ${styles.colors.white};
    position: absolute;
    ${props => props.bottom ? 'top: -0.3rem' : 'bottom: -0.3rem'};
    transform: rotate(${props => props.bottom ? '-135deg' : '45deg' });
    z-index: 0;
    border-bottom: 1px solid ${styles.colors.gray[20]};
    border-right: 1px solid ${styles.colors.gray[20]};
    left: calc(50% - 0.25rem);
    content: '';
  }
`;

interface Props {
  helpText: string,
  bottom?: boolean,
  left?: boolean
}

const InfoButton: React.FC<Props> = ({ helpText, bottom = false, left = false }) => {
  
  const [ active, setActive ] = useState(false);

  return <InfoButtonEl onClick={(e) => {e.preventDefault(); console.log('eeee')}} onMouseOver={() => {
    setActive(true);
  }} onMouseOut={() => {
    setActive(false);
  }} onFocus={() => {
    setActive(true);
  }} onBlur={() => {
    setActive(false);
  }}>
    <CircleInfoIcon height={'0.75rem'} />
    <Tooltip left={left} bottom={bottom} style={{ visibility: active ? 'visible' : 'hidden', opacity: active ? '1' : '0', width: `${Math.min(helpText.length, 20)}ch` }}>
      {helpText}
    </Tooltip>
  </InfoButtonEl>
}

export default InfoButton;