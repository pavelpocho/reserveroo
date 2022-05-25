import React, { useState } from "react";
import { IdInput } from "./ObjectInput";

interface ImageInputProps {
  name: string,
  hidden?: boolean,
  onChange?: (v: string | null | undefined) => void
}

export const ImageInput: React.FC<ImageInputProps> = ({ name, hidden, onChange }) => {

  const [ hasValue, setHasValue ] = useState(false);

  return <div style={{ visibility: hidden ? 'hidden' : 'visible' }}>
    <input type='file' name={hasValue ? name : ''} accept='.png,.jpg,.jpeg,.webp,.gif' onChange={(e) => {
      setHasValue(e.currentTarget.value != null && e.currentTarget.value != '');
      if (onChange) onChange(e.currentTarget.value);
    }} />
  </div>
}