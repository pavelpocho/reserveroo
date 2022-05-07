import styled from "styled-components"

interface ButtonProps {
  children?: React.ReactNode
}

const ButtonWrap = styled.button`

`;

export const Button: React.FC<ButtonProps> = ({ children }: ButtonProps) => <ButtonWrap>{children}</ButtonWrap>