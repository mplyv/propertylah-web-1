import Container from "../UI/Container";
import FilterBar from "./components/FilterBar"; 
import { useNavigate } from "react-router-dom";

import API from './API.js'
import styles from './property.module.css'

import {useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

//todo featured agents

const PropertyList = (props)=>{
  let navigate = useNavigate();
  const [data, setData] = useState([]);
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
  const params = useParams();
  const sellerId = params.sellerId; 

  //* Initial populate + rerender every filter
  useEffect(() => {
    async function fetchData(){
      let connectAPI = await API.get('/properties');
      let APIdata = connectAPI.data.data;
      let filtered = APIdata;

      if(sellerId !== undefined){
        filtered = APIdata.filter(propertyObj=>propertyObj.sellerId === parseInt(sellerId))
      }
      if(props.path === 'All'){
        // return all
      } else {
        filtered = APIdata.filter(propertyObj=>propertyObj.saleType === props.path)
      }
      if(propertyType !== 'All'){
        filtered = filtered.filter(propertyObj=>propertyObj.propertyType === propertyType)
      }
      if(noOfBedrooms === 'All'){
        // return all
      } else {
        filtered = filtered.filter(propertyObj=>propertyObj.noOfBedrooms === parseInt(noOfBedrooms))
      }
      if(noOfBathrooms === 'All'){
        // return all
      } else {
        filtered = filtered.filter(propertyObj=>propertyObj.noOfBaths === parseInt(noOfBathrooms))
      }
      if(minPrice === '' && maxPrice === ''){
        // return all
      } else if(minPrice === ''){
        filtered = filtered.filter(propertyObj=>propertyObj.price <= maxPrice)
      } else if(maxPrice === ''){
        filtered = filtered.filter(propertyObj=>propertyObj.price >= minPrice)
      } else {
        filtered = filtered.filter(propertyObj=>propertyObj.price >= minPrice && propertyObj.price <= maxPrice)
      }
      if(minPSF === '' && maxPSF === ''){
        // return all
      } else if(minPSF === ''){
        filtered = filtered.filter(propertyObj=>propertyObj.pricePSF <= maxPSF)
      } else if(maxPSF === ''){
        filtered = filtered.filter(propertyObj=>propertyObj.pricePSF >= minPSF)
      } else {
        filtered = filtered.filter(propertyObj=>propertyObj.pricePSF >= minPSF && propertyObj.pricePSF <= maxPSF)
      }
      if(minFloorsize === '' && maxFloorsize === ''){
        // return all
      } else if(minFloorsize === ''){
        filtered = filtered.filter(propertyObj=>propertyObj.floorsize <= maxFloorsize)
      } else if(maxFloorsize === ''){
        filtered = filtered.filter(propertyObj=>propertyObj.floorsize >= minFloorsize)
      } else {
        filtered = filtered.filter(propertyObj=>propertyObj.floorsize >= minFloorsize && propertyObj.floorsize <= maxFloorsize)
      }
      if(minYear === '' && maxYear === ''){
        // return all
      } else if(minYear === ''){
        filtered = filtered.filter(propertyObj=>propertyObj.TOPYear <= maxYear)
      } else if(maxYear === ''){
        filtered = filtered.filter(propertyObj=>propertyObj.TOPYear >= minYear)
      } else {
        filtered = filtered.filter(propertyObj=>propertyObj.TOPYear >= minYear && propertyObj.TOPYear <= maxYear)
      }
      if(tenure !== 'All'){
        filtered = filtered.filter(propertyObj=>propertyObj.tenure === tenure)
      }
      setData(filtered);
    };
    fetchData();
  },[props.path, minPrice,maxPrice,minFloorsize,maxFloorsize,minPSF,maxPSF,minYear,maxYear,noOfBathrooms,noOfBedrooms,propertyType,tenure,sellerId]);

  return(
    <Container>
      <FilterBar propertyType={propertyType} setPropertyType={setPropertyType} noOfBedrooms={noOfBedrooms} setNoOfBedrooms={setNoOfBedrooms} minPrice={minPrice} maxPrice={maxPrice}
        setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setMinFloorsize={setMinFloorsize} setMaxFloorsize={setMaxFloorsize} setMinPSF={setMinPSF} setMaxPSF={setMaxPSF}
        setMinYear={setMinYear} setMaxYear={setMaxYear} setNoOfBathrooms={setNoOfBathrooms} setTenure={setTenure}
      />
      <div className={styles.mainContainer}>
        <div className={styles.cardContainer}>
          <div>
            <p>{data.length} Properties found in Singapore</p>
            {data.map(propertyData =>{
              return(
                <div className={styles.propertyContainer} key = {propertyData.id} onClick={()=>navigate(`/properties/rent/${propertyData.id}`)}> 
                  <img className={styles.image} src='/assets/property-images/Sky-Vue-Ang-Mo-Kio-Bishan-Thomson-Singapore-1.jpg' alt='image1' />
                  <div className={styles.propertyCard}>
                    <p className={styles.fontLargeBold}>{propertyData.propertyName}</p>
                    <p className={styles.fontSmall}>{propertyData.address}</p>
                    <div className={styles.horizontalContainer}>
                      {propertyData.saleType==='Rent'? <p>S$ {propertyData.price.toLocaleString()} /mo</p>: <p>S$ {propertyData.price.toLocaleString()}</p>}
                      <p className={styles.availability}>• Available from</p>
                    </div>
                    <div className={styles.horizontalContainer}>
                      <p>{propertyData.noOfBedrooms} <img className={styles.icon} src='/assets/icons/bed-icon.png' alt='bedIcon'></img></p>
                      <p>{propertyData.noOfBaths} <img className={styles.icon} src='/assets/icons/bath-icon.png' alt='bathIcon'></img></p>
                      <p>• {propertyData.floorsize} sqft</p>
                      <p>• S$ {propertyData.pricePSF} psf</p>
                    </div>
                    <p>Distance to MRT</p>
                  </div>
                  <div className={styles.agentCard}>
                    <div>
                      <p>Listed by {propertyData.User.firstName} {propertyData.User.lastName}</p>
                      <p>'Great Property!!'</p>
                    </div>
                    <div className={styles.whatsappButton}><img className={styles.icon} src='/assets/icons/phone-icon.png' alt='phoneIcon'/>Whatsapp</div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles.sidebar}>
            <p>Featured Agents</p>
          </div>
        </div>
      </div>
    </Container>
  )
}


export default PropertyList;
