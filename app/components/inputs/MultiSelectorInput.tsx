import React from "react";
import styled from "styled-components";
import { Button } from "../button";
import { IdInput } from "./ObjectInput";
import { TextInput } from "./TextInput";

type ValueAndText = {
  value: string;
  text: string;
}

interface MultiSelectorProps {
  possibleValuesAndTexts: ValueAndText[],
  defaultValuesAndTexts: ValueAndText[],
  name?: string,
  removedName?: string,
  addedName?: string,
}

const Wrap = styled.div`
  height: 2rem;
  margin-bottom: 5rem;
`;

export const MultiSelectorInput: React.FC<MultiSelectorProps> = ({ name, removedName, addedName, possibleValuesAndTexts, defaultValuesAndTexts }) => {
  
  // These keep track of what was added or removed compared to the default value
  // This is useful for updating the database, where when updating many relations,
  // you can specify a list of ids to disconnect and a list of ids to connect
  // It also lowers the amount of things sent

  const [ valuesAndTexts, setValuesAndTexts ] = React.useState<ValueAndText[]>(defaultValuesAndTexts);
  const [ addedValuesAndTexts, setAddedValuesAndTexts ] = React.useState<ValueAndText[]>([]);
  const [ removedValuesAndTexts, setRemovedValuesAndTexts ] = React.useState<ValueAndText[]>([]);

  return <Wrap>
    <TextInput value={valuesAndTexts.map(v => v.text).join(', ')} readOnly={true} />
    { possibleValuesAndTexts.map(pv => <Button key={pv.value} onClick={() => {
      setRemovedValuesAndTexts(() => {
        if (valuesAndTexts.find(v => v.value == pv.value) && defaultValuesAndTexts.find(v => v.value == pv.value)) {
          return [...removedValuesAndTexts, pv];
        }
        else if (removedValuesAndTexts.find(v => v.value == pv.value)) {
          return [...removedValuesAndTexts.filter(v => v.value != pv.value)]
        }
        else {
          return removedValuesAndTexts
        }
      });
      setAddedValuesAndTexts(() => {
        if (!defaultValuesAndTexts.find(v => v.value == pv.value) && !valuesAndTexts.find(v => v.value == pv.value)) {
          return [...addedValuesAndTexts, pv];
        }
        else if (addedValuesAndTexts.find(v => v.value == pv.value)) {
          return [...addedValuesAndTexts.filter(v => v.value != pv.value)]
        }
        else {
          return addedValuesAndTexts
        }
      });
      setValuesAndTexts(() => {
        if (valuesAndTexts.find(v => v.value == pv.value)) {
          return [...valuesAndTexts.filter(v => v.value != pv.value)]
        }
        else {
          return [...valuesAndTexts, pv];
        }
      });
    }}>{pv.text}</Button>) }
    { name && valuesAndTexts.map(v => <IdInput key={v.value} name={name} value={v.value} />) }
    { removedName && removedValuesAndTexts.map(v => <IdInput key={v.value} name={removedName} value={v.value} />) }
    { addedName && addedValuesAndTexts.map(v => <IdInput key={v.value} name={addedName} value={v.value} />) }
  </Wrap>
}
