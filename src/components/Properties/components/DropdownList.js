import styles from '../property.module.css'

const DropdownList = (props)=>{
    return (
        <select id={props.id} className={styles[props.className]} onChange={props.onChange} value={props.value}>
            {props.options.map((selection)=>{
                return(
                    <option key={selection}>{selection}</option>
                )
            })}
        </select>
    )
}

export default DropdownList

// props = {id, className, onChange, value, options}
// options = options to appear on dropdown list
// id to handle if case for onChange function.
// className for styling

// see PopupComponent.js or FilterBar.js for example