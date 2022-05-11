import React from "react";
import styled from "styled-components";
import { styles } from "~/constants/styles";

interface TextInputProps {
  name?: string,
  title?: string,
  defaultValue?: string,
  value?: string,
  password?: boolean,
  readOnly?: boolean
}

const TextInputField = styled.input`
  font-size: 0.8rem;
  line-height: 2rem;
  padding: 0rem 1rem;
  border: 1.5px solid ${styles.colors.gray[30]};
  border-radius: 0.3rem;
  outline: none;
  &:focus {
    border: 1.5px solid ${styles.colors.gray[50]};
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

export const TextInput: React.FC<TextInputProps> = ({ name, title, defaultValue, password, readOnly, value: forcedValue }: TextInputProps) => {

  const [ value, setValue ] = React.useState<string>(defaultValue ?? '');

  return <Wrap>
    { title && <Label>{title}</Label> }
    <TextInputField readOnly={readOnly} name={name} type={password ? 'password' : 'text'} value={forcedValue ?? value} onChange={(e) => { setValue(e.currentTarget.value); }} />
  </Wrap>

}
