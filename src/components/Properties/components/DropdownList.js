import styles from '../property.module.css'

const DropdownList = (props)=>{
    return (
        <select className={styles.filterSearchBarButton} onChange={props.onChange} value={props.value}>
            {props.options.map((selection)=>{
                return(
                    <option key={selection}>{selection}</option>
                )
            })}
        </select>
    )
}

export default DropdownList