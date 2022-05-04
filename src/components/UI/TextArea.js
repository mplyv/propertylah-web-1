import { useState } from "react";
import classes from "./TextArea.module.css"

const TextArea = ( props ) => {
  const [ focused, setFocused ] = useState(false);
  const { label, onChange, defaultValue, errorMessage, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  }

  return (
    <div className={classes.container}>
      <label className={classes.label}>{label}</label>
      <textarea className={classes.textarea} name={props.name} placeholder={props.placeholder} rows="4" type={props.type} onChange={onChange} required={props.required} onBlur={handleFocus} focused={focused.toString()} defaultValue={defaultValue}
      />
      <span className={classes.errorMessage} >{errorMessage}</span>
    </div>
  )
}

export default TextArea;