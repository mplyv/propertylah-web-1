import styles from '../property.module.css';

const DropdownButtons = (props)=>{
    return(
        props.type === 'num'? 
        <div className={styles.horizontalContainerPopup}>
            <div id={props.options[0]} className={props.variable.includes('All')? styles.selected : styles.filterSearchBarButton} onClick={props.handleChange}>All</div>
            {props.options.map((option)=>{
                return(
                    option.includes('All')? null:<div key={option} id={option} className={option.includes(props.variable)? styles.selected:styles.filterSearchBarButton} onClick={props.handleChange}>{option.slice(0,1)}</div>
                )
            }
            )}
        </div>
        :
        <div className={styles.horizontalContainerPopup}>
            <div id={props.options[0]} className={props.variable.includes('All')? styles.selected : styles.filterSearchBarButton} onClick={props.handleChange}>All</div>
            {props.options.map((option)=>{
                return(
                    option.includes('All')? null:<div key={option} id={option} className={option.includes(props.variable)? styles.selected:styles.filterSearchBarButton} onClick={props.handleChange}>{option}</div>
                )
            }
            )}
        </div>
    )
}
    
export default DropdownButtons