import React from "react";
import styled from "styled-components";
import { styles } from "~/constants/styles";

interface ConfirmationDialogProps {
  hidden: boolean,
  onConfirm: () => void,
  title: string,
  text: string,
  confirmText: string,
  cancelText: string,
  close: () => void
}

const Wrap = styled.div<{ hidden: boolean }>`
  position: fixed;
  visibility: ${props => props.hidden ? 'hidden' : 'visible'};
  transition: opacity 0.15s ease-in-out, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: scale(0.9);
  opacity: 0;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Window = styled.div`
  background-color: ${styles.colors.white};
  box-shadow: ${styles.shadows[0]};
  width: 32rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 2rem;
  padding: 1.5rem;
  z-index: 1;
`;

const Backdrop = styled.div`
  position: fixed;
  z-index: 0;
  background-color: ${styles.colors.black}20;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  align-items: center;
`;

const Title = styled.h3`
  margin: 0px;
`;

const Text = styled.p`
  margin: 0px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  display: block;
`;

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ hidden, title, text, confirmText, cancelText, onConfirm, close }) => {

  const wrap = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setTimeout(() => {
      if (wrap.current) {
        wrap.current.style.opacity = hidden ? '0' : '1';
        wrap.current.style.transform = hidden ? 'scale(0.9)' : 'scale(1)';
      }
    }, 100);
  }, [hidden]);

  return <Wrap hidden={hidden} ref={wrap}>
    <Backdrop onClick={close} />
    <Window>
      <Title>{title}</Title>
      <Text>{text}</Text>
      <ButtonRow>
        <Button onClick={close}>{cancelText}</Button>
        <Button onClick={() => {onConfirm(); close()}}>{confirmText}</Button>
      </ButtonRow>
    </Window>
  </Wrap>
}