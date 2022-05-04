import { useState } from "react";
import classes from "./Dropdown.module.css";

const Dropdown = ( props ) => {
  const [ focused, setFocused ] = useState(false);
  const { label, onChange, defaultValue, errorMessage, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  }

  return (
    <div className={classes.container}>
      <label className={classes.label}>
        {label}
      <select className={classes.select} name={props.name} placeholder={props.placeholder} onChange={onChange} required={props.required} onBlur={handleFocus} focused={focused.toString()} defaultValue={defaultValue}>
        <option value="" hidden>{props.placeholder}</option>
        {props.options.map((options) => {
          return (
            <option className={classes.option} id={options} key={options}>{options}</option>
          )
        })}
      </select>
      </label>
      <span className={classes.errorMessage} >{errorMessage}</span>
    </div>
  )
}

export default Dropdown;