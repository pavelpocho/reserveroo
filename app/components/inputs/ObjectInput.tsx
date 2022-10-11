import React from "react";

interface IdInputInterface {
  name?: string,
  value: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

export const IdInput: React.FC<IdInputInterface> = ({ name, value, onChange }: IdInputInterface) => {

  return <>
    <input name={name} type='text' readOnly={true} value={value} hidden={true} onChange={onChange} />
  </>

}
