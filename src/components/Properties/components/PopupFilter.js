import React , {useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styles from '../property.module.css'
import DropdownButtons from './DropdownButtons';
import Input from './Input'

//* Options
let propertyTypeOptions = ['All Property','HDB','Apartment','Condominium'];
let bedroomOptions = ['All Qty Bedrooms','1bed','2bed','3bed','4bed','5+bed'];
let tenureOptions = ['All Tenure','Freehold','Leasehold'];
let bathOptions = ['All Qty Bathrooms','1bath','2bath','3bath','4bath','5+bath'];
let priceOptions = ['MinPrice','MaxPrice'];
let floorsizeOptions = ['MinFloorSize','MaxFloorSize'];
let PSFOptions = ['MinPSF','MaxPSF'];
let TOPYearOptions = ['MinTOP','MaxTOP']


const PopupFilter = (props) => {
    //* Variables
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minFloorsize, setMinFloorsize] = useState('');
    const [maxFloorsize, setMaxFloorsize] = useState('');
    const [minPSF, setMinPSF] = useState('');
    const [maxPSF, setMaxPSF] = useState('');
    const [minYear, setMinYear] = useState('');
    const [maxYear, setMaxYear] = useState('');
    const [noOfBathrooms, setNoOfBathrooms] = useState('All')
    const [noOfBedrooms, setNoOfBedrooms] = useState('All');
    const [propertyType, setPropertyType] = useState('All');
    const [tenure, setTenure] = useState("All");
    
    //* onChange and selector handlers
    const handlePropertyType = (event)=>{
        let options = propertyTypeOptions;
        if(event.target.id === options[0]){
            setPropertyType("All");
        } else {
            setPropertyType(event.target.id);
        }
    }
    const handleTenure = (event)=>{
        let options = tenureOptions;
        if(event.target.id === options[0]){
            setTenure("All");
        } else {
            setTenure(event.target.id);
        }
    }
    const handleNoOfBeds = (event)=>{
        let options = bedroomOptions;
        if(event.target.id === options[0]){
            setNoOfBedrooms("All");
        } else {
            setNoOfBedrooms(event.target.id.slice(0,1));
        }
    }
    const handleNoOfBaths = (event)=>{
        let options = bathOptions;
        if(event.target.id === options[0]){
            setNoOfBathrooms("All");
        } else {
            setNoOfBathrooms(event.target.id.slice(0,1));
        }
    }
    const handleInputChange = (event=>{
        let type = [...priceOptions,...floorsizeOptions,...PSFOptions,...TOPYearOptions];
        let functions = [setMinPrice,setMaxPrice,setMinFloorsize,setMaxFloorsize,setMinPSF,setMaxPSF,setMinYear,setMaxYear];
        for (let i=0;i<type.length;i++){
            if(event.target.id === type[i]){
                functions[i](event.target.value)
            }
        }
    })

    //* Submit and Clear functions
    const handleSubmit = ()=>{
        props.setMinPrice(minPrice);
        props.setMaxPrice(maxPrice);
        props.setMinFloorsize(minFloorsize);
        props.setMaxFloorsize(maxFloorsize);
        props.setMinPSF(minPSF);
        props.setMaxPSF(maxPSF);        
        props.setMinYear(minYear);
        props.setMaxYear(maxYear);
        props.setNoOfBathrooms(noOfBathrooms);
        props.setNoOfBedrooms(noOfBedrooms);
        props.setPropertyType(propertyType);
        props.setTenure(tenure);
    }

    const clearAllFilters = ()=>{
        let functions = [setMinPrice,setMaxPrice,setMinFloorsize,setMaxFloorsize,setMinPSF,setMaxPSF,setMinYear,setMaxYear];
        for (let i=0;i<functions.length;i++){
            functions[i]('');
        }
        setNoOfBathrooms('All');
        setPropertyType('All');
        setNoOfBedrooms('All');
        setTenure("All");
    }

    //* Styling for popup modal
    const contentStyle = { background: 'white', width:'600px', height:'700px', overflowY: "auto", padding:'0px 0px'};

    return(
        <Popup trigger={<div className={styles.filterSearchBarButton}>Filter</div>} position="right center" modal {...{ contentStyle }}>
            <div>
                <form>
                    <div className={styles.popupCards}>
                        <p>Property Type</p>
                        <DropdownButtons handleChange={handlePropertyType} options={propertyTypeOptions} type='text' variable={propertyType}/>
                    </div>
                    <div className={styles.popupCards}>
                        <p>Price</p>
                        <Input min={minPrice} max={maxPrice} onChange={handleInputChange} options={priceOptions}/>
                    </div>
                    <div className={styles.popupCards}>
                        <p>Bedrooms</p>
                        <DropdownButtons handleChange={handleNoOfBeds} options={bedroomOptions} type='num' variable={noOfBedrooms}/>
                    </div>
                    <div className={styles.popupCards}>
                        <p>Floorsize</p>
                        <Input min={minFloorsize} max={maxFloorsize} onChange={handleInputChange} options={floorsizeOptions}/>
                    </div>
                    <div className={styles.popupCards}>
                        <p>Bathrooms</p>
                        <DropdownButtons handleChange={handleNoOfBaths} options={bathOptions} type='num' variable={noOfBathrooms}/>
                    </div>
                    <div className={styles.popupCards}>
                        <p>Tenure</p>
                        <DropdownButtons handleChange={handleTenure} options={tenureOptions} type='text' variable={tenure}/>
                    </div>
                    <div className={styles.popupCards}>
                        <p>PSF</p>
                        <Input min={minPSF} max={maxPSF} onChange={handleInputChange} options={PSFOptions}/>
                    </div>
                    <div className={styles.popupCards}>
                        <p>Build Year</p>
                        <Input min={minYear} max={maxYear} onChange={handleInputChange} options={TOPYearOptions}/>
                    </div>
                    <div className={styles.horizontalContainerPopupFixed}>
                        <div className={styles.clearButton} onClick={clearAllFilters}>Reset All Filters</div>
                        <div className={styles.applyFilter} onClick={handleSubmit}>Apply Filter</div>
                    </div>
                </form>
            </div>
        </Popup>
    )
};

export default PopupFilter