import React from "react";
import styled from "styled-components";
import { Button } from "../button";
import { IdInput } from "./ObjectInput";
import { TextInput } from "./TextInput";

type ValueAndText = {
  value: string;
  text: string;
}

interface SingleSelectorProps {
  possibleValuesAndTexts: ValueAndText[],
  defaultValueAndText: ValueAndText | null,
  name?: string,
  title?: string
}

const Wrap = styled.div`
  height: 2rem;
  margin-bottom: 5rem;
`;

export const SingleSelectorInput: React.FC<SingleSelectorProps> = ({ title, name, possibleValuesAndTexts, defaultValueAndText }) => {

  const [ valueAndText, setValueAndText ] = React.useState<ValueAndText | null>(defaultValueAndText);

  return <Wrap>
    <TextInput title={title ?? ''} value={valueAndText?.text ?? ''} readOnly={true} />
    { possibleValuesAndTexts.map(pv => <Button key={pv.value} onClick={() => {
      setValueAndText(pv);
    }}>{pv.text}</Button>) }
    { name && valueAndText?.value && <IdInput key={valueAndText.value} name={name} value={valueAndText.value} /> }
  </Wrap>
}
