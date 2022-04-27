import Container from "../UI/Container";
import FilterBar from "./FilterBar"; 
import { useNavigate } from "react-router-dom";

// import API from './API.js'
import styles from './property.module.css'

import {useEffect, useState} from 'react'
import dummyData from './dummyData'

const PropertyList = (props)=>{
  let navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
      async function fetchData(){
        const filtered = dummyData.filter(propertyObj=>propertyObj.saleType === props.path)
        setData(filtered)
        console.log(filtered)
        // let connectAPI = await API.get('/properties');
        // let APIdata = connectAPI.data.data;
        // setData(APIdata);
        // console.log(APIdata)
      };
      fetchData();
  },[props.path]);

  return(
    <Container>
        <FilterBar />
      <div className={styles.mainContainer}>
        <div className={styles.cardContainer}>
          <div>
            <p>{data.length} Properties in Singapore</p>
            {data.map(propertyData =>{
              return(
                // todo fix navigate after creating specific property page
                <div className={styles.propertyContainer} key = {propertyData.id} onClick={()=>navigate('/properties')}> 
                  <img className={styles.image} src='/assets/property-images/Sky-Vue-Ang-Mo-Kio-Bishan-Thomson-Singapore-1.jpg' alt='image1' />
                  <div className={styles.propertyCard}>
                    <p className={styles.fontLargeBold}>{propertyData.propertyName}</p>
                    <p className={styles.fontSmall}>{propertyData.address}</p>
                    <div className={styles.horizontalContainer}>
                      {propertyData.saleType==='Rent'? <p>S$ {propertyData.price} /mo</p>: <p>S$ {propertyData.price}</p>}
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

