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
  defaultValueAndText: ValueAndText,
  name?: string
}

const Wrap = styled.div`
  height: 2rem;
  margin-bottom: 5rem;
`;

export const SingleSelectorInput: React.FC<SingleSelectorProps> = ({ name, possibleValuesAndTexts, defaultValueAndText }) => {

  const [ valueAndText, setValueAndText ] = React.useState<ValueAndText>(defaultValueAndText);

  return <Wrap>
    <TextInput title='Location' value={valueAndText.text} readOnly={true} />
    { possibleValuesAndTexts.map(pv => <Button key={pv.value} onClick={() => {
      setValueAndText(pv);
    }}>{pv.text}</Button>) }
    { name && <IdInput key={valueAndText.value} name={name} value={valueAndText.value} /> }
  </Wrap>
}
