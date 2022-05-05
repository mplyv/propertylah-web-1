import { useState } from "react";
import classes from "./FormInput.module.css"

const FormInput = ( props ) => {
  const [ focused, setFocused ] = useState(false);
  const { label, onChange, defaultValue, errorMessage, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  }

  return (
    <div className={classes.container}>
      <label className={classes.label}>{label}</label>
      <input className={classes.input} name={props.name} placeholder={props.placeholder} type={props.type} onChange={onChange} required={props.required} onBlur={handleFocus} focused={focused.toString()} defaultValue={defaultValue} />
      <span className={classes.errorMessage} >{errorMessage}</span>
    </div>
  )
}

export default FormInput;