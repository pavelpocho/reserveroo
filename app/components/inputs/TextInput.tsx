import React from "react";
import styled from "styled-components";
import { styles } from "~/constants/styles";

interface TextInputProps {
  name: string,
  title: string,
  defaultValue: string
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

export const TextInput: React.FC<TextInputProps> = ({ name, title, defaultValue }: TextInputProps) => {

  const [ value, setValue ] = React.useState<string>(defaultValue);

  return <div>
    <label>{title}</label>
    <TextInputField type='text' value={value} onChange={(e) => { setValue(e.currentTarget.value); }} />
    <input name={name} type='text' readOnly={true} value={value} hidden={true} />
  </div>

}
