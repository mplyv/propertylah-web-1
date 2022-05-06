import styles from '../property.module.css';
import Popup from 'reactjs-popup';

const contentStyle = { background: 'lightgrey', width:'auto', padding: '10px' };

const DropdownInputs = (props)=>{

    let header = "Price"
    if(props.min === '' && props.max === ''){
        header = 'Price'
    } else if (props.min === '' && props.max !== ''){
        header = `Below S$ ${props.max}`
    } else if (props.min !== '' && props.max === ''){
        header = `Above S$ ${props.min}`
    } else {
        header = `S$ ${props.min} - ${props.max}`
    }

    return(
        <Popup 
        className={styles.horizontalContainerPopup} 
        trigger={<div data-testid='test-priceFilter' className={styles.filterSearchBarButton}>{header}</div>} 
        position="bottom center" {...{ contentStyle }}>
            <div>
                <div className={styles.horizontalContainerPopup}>
                    <p className={styles.inputLabel}>S$</p>
                    <input data-testid={'test-MinPrice'} id={props.options[1]} className={styles.input} type='number' value={props.min} placeholder={props.options[1]} onChange={props.onChange}></input>
                    <p className={styles.inputLabel}>S$</p>
                    <input data-testid={'test-MaxPrice'} id={props.options[2]} className={styles.input} type='number' value={props.max} placeholder={props.options[2]} onChange={props.onChange}></input>
                </div>
                <div className={styles.horizontalContainerPopup}>
                    <div className={styles.clearButton} onClick={props.clear}>Clear</div>
                </div>
            </div>
        </Popup>
    )
}

export default DropdownInputs
