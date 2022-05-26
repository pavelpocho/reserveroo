import styled from "styled-components";
import { styles } from "~/constants/styles";

export const Title = styled.h2`
  color: ${styles.colors.black};
  text-align: center;
  font-size: 1.375rem;
  margin: 2rem 0rem 1rem;
  @media (min-width: 500px) {
    font-size: 2rem;
  }
  @media (min-width: 800px) {
    font-size: 2.3rem;
  }
`;

export const TabBar = styled.div`
  margin: 1rem auto;
  width: 95%;
  max-width: 500px;
  justify-content: center;
  align-items: stretch;
  display: flex;
  padding: 0.5rem 0rem;
  border: 1.5px solid ${styles.colors.gray[140]}40;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
`;

export const Separator = styled.div`
  width: 1px;
  background-color: ${styles.colors.gray[50]};
`;

export const AuthTabButton = styled.button`
  width: 50%;
  display: flex;
  background-color: transparent;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.2rem 0;
  margin: 0;
  justify-content: center;
  align-items: center;
  color: ${styles.colors.gray[110]};
  font-weight: bold;
  text-decoration: none;
`;

export const Text = styled.p<{ bottom?: boolean }>`
  font-weight: 500;
  padding: 0 1rem;
  margin-bottom: ${props => props.bottom ? '2rem' : ''};
  font-size: 0.875rem;
`;

export const ActiveHighlighter = styled.div<{ position: number }>`
  position: absolute;
  height: calc(100% - 0.4rem);
  border-radius: 0.25rem;
  width: calc(50% - 0.4rem);
  transition: left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  left: ${props => props.position == 0 ? '0px' : '50%'};
  top: 0px;
  margin: 0.2rem;
  background-color: ${styles.colors.action};
  z-index: -1;
`;

export const AuthWrap = styled.div`
  max-width: 500px;
  margin: 0px auto;
  margin-top: 2rem;
  box-sizing: border-box;
  background-color: ${styles.colors.gray[5]};
  padding: 0.75rem;
  @media (min-width: 500px) {
    border-radius: 0.25rem;
  }
`;

export const FieldSet = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SubmitButton = styled.button`
  padding: 0.8rem 0rem;
  border: 1.5px solid ${styles.colors.gray[20]};
  border-radius: 0.4rem;
  background-color: ${styles.colors.white};
  cursor: pointer;
  font-size: 0.9rem;
`;

export const PwdWarn = styled.p`
  margin: 0;
  color: ${styles.colors.busy};
  font-size: 0.875rem;
`;
export const PwdInfo = styled.p`
  margin: 0;
  color: ${styles.colors.black};
  font-size: 0.875rem;
`;

export const Bar = styled.div<{ width: number }>`
  width: ${props => props.width}%;
  height: 6px;
  min-width: 6px;
  border-radius: 3px;
  background-color: ${props => (
    props.width < 25 ? styles.colors.busy : props.width < 50 ? styles.colors.warn :
    props.width < 75 ? styles.colors.primary : styles.colors.free
  )};
`;

export const BarBack = styled.div`
  width: 100%;
  background-color: ${styles.colors.gray[70]};
  height: 6px;
  border-radius: 3px;
`;