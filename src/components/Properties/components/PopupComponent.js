import React , { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styles from '../property.module.css'
import API from '../API';
import { useNavigate, useParams } from 'react-router-dom';
import DropdownList from './DropdownList';

const PopupComponent = (props) => {
    //* Styling for popup modal
    let contentStyle = '';
    if (props.name === 'Edit' || props.name === 'Add'){
        contentStyle = { background: 'white', width:'600px', height:'60vh', overflowY: "auto", padding:'0px 0px'};
    } else if (props.name === 'Delete'){
        contentStyle = { background: 'white', width:'400px', height:'110px', overflowY: "auto", padding:'0px 0px'};
    }
    //* popup controllers
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    //* Initial state
    const [propertyName, setPropertyName] = useState(props.propertyData.propertyName);
    const [address, setAddress] = useState(props.propertyData.address);
    const [price, setPrice] = useState(props.propertyData.price);
    const [noOfBedrooms, setNoOfBedrooms] = useState(props.propertyData.noOfBedrooms);
    const [noOfBathrooms, setNoOfBathrooms] = useState(props.propertyData.noOfBaths);
    const [floorsize, setFloorsize] = useState(props.propertyData.floorsize);
    const [tenure, setTenure] = useState(props.propertyData.tenure || 'Freehold');
    const [propertyType, setPropertyType] = useState(props.propertyData.propertyType || 'HDB');
    const [saleType, setSaleType] = useState(props.propertyData.saleType || 'Sale');
    const [TOPYear, setTOPYear] = useState(props.propertyData.TOPYear);
    const [postcode, setPostcode] = useState(props.propertyData.postcode);

    let navigate = useNavigate();
    const params = useParams();

    const handleDelete = ()=>{
        async function deleteProperty(){
            const result = await API.delete(`/properties/${props.propertyData.id}`);
            if(result.status === 200){
                window.alert('Property Deleted')
                navigate(`/properties/agent/${props.propertyData.sellerId}`)
            } else {
                window.alert('Something went wrong!!')
            }
        };
        deleteProperty();
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        async function editProperty (){
            const result = await API.patch(`/properties/${props.propertyData.id}`,{
                "saleType" : saleType,
                "tenure" : tenure,
                "propertyName" : propertyName,
                "address" : address,
                "postcode" : postcode,
                "price" : price,
                "noOfBedrooms" : noOfBedrooms,
                "noOfBaths" : noOfBathrooms,
                "floorsize" : floorsize,
                "propertyType" : propertyType,
                "TOPYear" : TOPYear,
                "sellerId": props.propertyData.sellerId,
            })
            if (result.status === 200){
                props.forceRefresh(!props.refresh)
            }
        };
        async function addProperty (){
            try{
                const result = await API.post(`/properties`,{
                    "saleType" : saleType,
                    "tenure" : tenure,
                    "propertyName" : propertyName,
                    "address" : address,
                    "postcode" : postcode,
                    "price" : price,
                    "noOfBedrooms" : noOfBedrooms,
                    "noOfBaths" : noOfBathrooms,
                    "floorsize" : floorsize,
                    "propertyType" : propertyType,
                    "TOPYear" : TOPYear,
                    "sellerId": params.sellerId,
                })
                if (result.status === 200){
                    let newProperty = result.data.data;
                    navigate(`/properties/agent/${params.sellerId}/${newProperty.id}`);
                    window.alert('Property Created')
                }
            } catch(error){
                console.log(error.message)
            }
        };
        if(props.name === 'Edit'){
            editProperty();
            setOpen(false);
        } else if (props.name === 'Add'){
            addProperty();
        }
    }
    const handleChange = (e)=>{
        switch(e.target.id){
            case 'propertyName': 
            setPropertyName(e.target.value);
            break;
            case 'address': 
            setAddress(e.target.value);
            break;
            case 'price': 
            if(e.target.value < 0){
                setPrice(props.propertyData.price)
                window.alert('Invalid Price')
            } else {
                setPrice(e.target.value);
            }
            break;
            case 'noOfBedrooms': 
            if(e.target.value > 5 || e.target.value < 0){
                window.alert('Number of Bathrooms must be between 0 to 5')
                setNoOfBedrooms(props.propertyData.noOfBedrooms)
            } else {
                setNoOfBedrooms(e.target.value);
            }
            break;
            case 'noOfBathrooms': 
            if(e.target.value > 5 || e.target.value < 0){
                window.alert('Number of Bathrooms must be between 0 to 5')
                setNoOfBathrooms(props.propertyData.noOfBaths)
            } else {
                setNoOfBathrooms(e.target.value);
            }
            break;
            case 'floorsize': 
            if(e.target.value < 0){
                setFloorsize(props.propertyData.floorsize)
                window.alert('Invalid Floorsize')
            } else {
                setFloorsize(e.target.value);
            }
            break;
            case 'tenure': 
            setTenure(e.target.value);
            break;
            case 'propertyType': 
            setPropertyType(e.target.value);
            break;
            case 'saleType': 
            setSaleType(e.target.value);
            break;
            case 'TOPYear': 
            setTOPYear(e.target.value);
            break;
            case 'postcode': 
            setPostcode(e.target.value);
            break;
        }
    };

    return(
        <>
            <button className={styles.CRUDButton} onClick={()=>{setOpen(o => !o)}}>{props.name}</button>
            <Popup open={open} onClose={closeModal} modal {...{ contentStyle }} closeOnDocumentClick={false} closeOnEscape={false}>
                {props.name === 'Delete'? 
                <div className={styles.deletePopup}>
                    <div style={{margin:'15px 0px 15px 20px',fontSize:'18px'}}>Confirm Delete? This Cannot Be Undone</div>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                        <button className={styles.button} style={{backgroundColor:'green'}} onClick={handleDelete}>Delete</button>
                        <button className={styles.button} style={{backgroundColor:'red'}} onClick={closeModal}>Cancel</button>
                    </div>
                </div>
                : 
                props.name === 'Edit' || props.name === 'Add'? 
                <form onSubmit={handleSubmit} style={{height:'100%'}}>
                    <div className={styles.editPopup}>
                        <div>
                            <p>Property Name</p>
                            <input required className={styles.input} id='propertyName' value={propertyName || ''} onChange={handleChange}></input>
                        </div>
                        <div>
                            <p>Address</p>
                            <input required className={styles.input} id='address' value={address || ''} onChange={handleChange}></input>
                        </div>
                        <div>
                            <p>Postcode</p>
                            <input required className={styles.input} id='postcode' value={postcode || ''} onChange={handleChange}></input>
                        </div>
                        <div>
                            <p>Price (S$)</p>
                            <input required type='number' min={0} className={styles.input} id='price' value={price || ''} onChange={handleChange}></input>
                        </div>
                        <div>
                            <p>Number of Bedrooms</p>
                            <div style={{display:'flex',flexDirection:'row',}}>
                                <input required type='number' min={0} max={5} className={styles.input} id='noOfBedrooms' value={noOfBedrooms || ''} onChange={handleChange}></input>
                                <p style={{alignSelf:'center'}}>*Enter 5 if more than 5</p>
                            </div>
                        </div>
                        <div>
                            <p>Number of Bathrooms</p>
                            <div style={{display:'flex',flexDirection:'row',}}>
                                <input required type='number' min={0} max={5} className={styles.input} id='noOfBathrooms' value={noOfBathrooms || ''} onChange={handleChange}></input>
                                <p style={{alignSelf:'center'}}>*Enter 5 if more than 5</p>
                            </div>
                        </div>
                        <div>
                            <p>Floorsize (sqft)</p>
                            <input required type='number' min={0} className={styles.input} id='floorsize' value={floorsize || ''} onChange={handleChange}></input>
                        </div>
                        <div>
                            <p>Tenure</p>
                            <DropdownList options={['Freehold','Leasehold']} className={'editInput'} onChange={handleChange} id={'tenure'} value={tenure}/>
                        </div>
                        <div>
                            <p>Property Type</p>
                            <DropdownList options={['HDB','Condominium','Apartment']} className={'editInput'} onChange={handleChange} id={'propertyType'} value={propertyType}/>
                        </div>
                        <div>
                            <p>Sale Type</p>
                            <DropdownList options={['Sale','Rent']} className={'editInput'} onChange={handleChange} id={'saleType'} value={saleType}/>
                        </div>
                        <div>
                            <p>TOP Year</p>
                            <input required className={styles.input} id='TOPYear' value={TOPYear || ''} onChange={handleChange}></input>
                        </div>
                    </div>
                    <div className={styles.horizontalContainerPopupFixed} >
                        <button className={styles.button} style={{backgroundColor:'green'}} >{props.name}</button>
                        <button type='button' className={styles.button} style={{backgroundColor:'red'}} onClick={closeModal}>Cancel</button>
                    </div>
                </form>
                :
                null}
            </Popup>
        </>
    )
}

export default PopupComponent
