import styles from '../property.module.css'

const Input = (props)=>{
    return(
        <div className={styles.horizontalContainerPopup}>
            <input id={props.options[0]} className={styles.input} type='number' placeholder='Min' value={props.min} onChange={props.onChange} data-testid={`test-${props.options[0]}`}></input>
            <input id={props.options[1]} className={styles.input} type='number' placeholder='Max' value={props.max} onChange={props.onChange} data-testid={`test-${props.options[1]}`}></input>
        </div>
    )
}

export default Input