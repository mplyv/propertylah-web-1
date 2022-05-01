import styles from '../property.module.css';
import DropdownList from './DropdownList';
import PopupFilter from "./PopupFilter";
import DropdownInputs from './DropdownInputs';

//todo search bar

const FilterBar = (props)=>{

    const handleChangePropertyType = (e)=>{
        if(e.target.value === 'Property Type: All'){
            props.setPropertyType('All')
        } else {
            props.setPropertyType(e.target.value);
        }
    }
    const handleChangeBedrooms = (e)=>{
        if(e.target.value === 'Bedrooms: All'){
            props.setNoOfBedrooms('All')
        } else if(e.target.value === '5+'){
            props.setNoOfBedrooms('5')
        } else {
            props.setNoOfBedrooms(e.target.value);
        }
    }
    const handlePriceChange = (e)=>{
        if (e.target.id.includes('Min')){
            props.setMinPrice(e.target.value);
        } else if (e.target.id.includes('Max')){
            props.setMaxPrice(e.target.value);
        }
    }
    const clearFilterBar = ()=>{
        props.setPropertyType('All');
        props.setNoOfBedrooms('All');
        props.setMinPrice('');
        props.setMaxPrice('');
    }
    const clearPrice = ()=>{
        props.setMinPrice('');
        props.setMaxPrice('');
    }

    return(
        <div className={styles.filterSearchBar}>
            <input className={styles.searchBar} placeholder='Search' ></input>
            <PopupFilter 
                setMinPrice={props.setMinPrice} setMaxPrice={props.setMaxPrice} 
                setMinFloorsize={props.setMinFloorsize} setMaxFloorsize={props.setMaxFloorsize}
                setMinPSF={props.setMinPSF} setMaxPSF={props.setMaxPSF}
                setMinYear={props.setMinYear} setMaxYear={props.setMaxYear}
                setNoOfBathrooms = {props.setNoOfBathrooms}
                setNoOfBedrooms = {props.setNoOfBedrooms}
                setPropertyType = {props.setPropertyType}
                setTenure = {props.setTenure}
            />
            <DropdownList onChange={handleChangePropertyType} value={props.propertyType} options={['Property Type: All','HDB','Condominium','Apartment']} className={`filterSearchBarButton`}/>
            <DropdownInputs clear={clearPrice} onChange={handlePriceChange} min={props.minPrice} max={props.maxPrice} options={['All','Min Price','Max Price']}/>
            <DropdownList onChange={handleChangeBedrooms} value={props.noOfBedrooms} options={['Bedrooms: All','1','2','3','4','5+']} className={`filterSearchBarButton`}/>
            <button className={styles.clearButton} onClick={clearFilterBar}>Clear All Filters</button>
        </div>
    )
}

export default FilterBar