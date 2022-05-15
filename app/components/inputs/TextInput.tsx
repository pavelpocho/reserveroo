import React from "react";
import styled from "styled-components";
import { styles } from "~/constants/styles";

interface TextInputProps {
  name?: string,
  title?: string,
  defaultValue?: string,
  value?: string,
  password?: boolean,
  readOnly?: boolean,
  placeholder?: string,
  style?: React.CSSProperties,
  containerStyle?: React.CSSProperties,
  onClick?: () => void
}

const TextInputField = styled.input`
  font-size: 0.875rem;
  line-height: 2rem;
  padding: 0.125rem 1rem;
  border: 1px solid ${styles.colors.gray[70]};
  border-radius: 0.375rem;
  outline: none;
  margin: 0;
  &:focus {
    border: 1px solid ${styles.colors.gray[50]};
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: bold;
`;

export const TextInput: React.FC<TextInputProps> = ({ name, placeholder, onClick, style, containerStyle, title, defaultValue, password, readOnly, value: forcedValue }: TextInputProps) => {

  const [ value, setValue ] = React.useState<string>(defaultValue ?? '');

  return <Wrap style={containerStyle}>
    { title && <Label>{title}</Label> }
    <TextInputField placeholder={placeholder} onClick={onClick} style={style} readOnly={readOnly} name={name} type={password ? 'password' : 'text'} value={forcedValue ?? value} onChange={(e) => { setValue(e.currentTarget.value); }} />
  </Wrap>

}
