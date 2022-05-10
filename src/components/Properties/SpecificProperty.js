import Container from "../UI/Container";
import { useParams } from "react-router-dom";
import styles from "./property.module.css";
import { useEffect, useState } from "react";
import API from "./API.js";
import PopupComponent from "./components/PopupComponent";

import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/favorites-thunks";

const SpecificProperty = () => {
  const favIds = useSelector((state) => state.favorites.favIds);
  const dispatch = useDispatch();
  const [propertyData, setPropertyData] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [refresh, forceRefresh] = useState(true);

  const toggleFavHandler = (id) => {
    if (!favIds.includes(id)) dispatch(addToFavorites(id));
    else dispatch(removeFromFavorites(id));
  };

  let params = useParams();
  let tempDate = new Date(propertyData.createdAt).toDateString();
  let date = `${tempDate.slice(4, 10)}, ${tempDate.slice(11)}`;

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      let connectAPI = await API.get(`/properties/${params.id}`);
      let data = connectAPI.data.data;
      setPropertyData(data);
    }
    fetchData();
  }, [params.id, refresh]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    window.alert(`Send Contact Details to ${propertyData.User.firstName} ${propertyData.User.lastName}
        ${name}
        ${number}
        ${email}`);
  };
  const handleChange = (e) => {
    if (e.target.placeholder === "Name") {
      setName(e.target.value);
    } else if (e.target.placeholder === "Mobile Number") {
      setNumber(e.target.value);
    } else {
      setEmail(e.target.value);
    }
  };

  return (
    <Container>
      {propertyData === "" ? null : (
        <div className={styles.mainContainer}>
          <div className={styles.cardContainer}>
            <div className={styles.specificPropertyContainer}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontSize: "26px",
                    padding: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {propertyData.propertyName}
                </p>
                <div style={{ margin: "auto 0px" }}>
                  {parseInt(params.sellerId) === propertyData.sellerId ? (
                    <PopupComponent
                      name="Edit"
                      propertyData={propertyData}
                      refresh={refresh}
                      forceRefresh={forceRefresh}
                    />
                  ) : null}
                  {parseInt(params.sellerId) === propertyData.sellerId ? (
                    <PopupComponent name="Delete" propertyData={propertyData} />
                  ) : null}
                </div>
              </div>
              <img
                className={styles.image}
                src="/assets/property-images/Sky-Vue-Ang-Mo-Kio-Bishan-Thomson-Singapore-1.jpg"
                alt="image1"
              />
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {propertyData.saleType === "Rent" ? (
                    <p className={styles.price}>
                      S$ {propertyData.price.toLocaleString()} /mo
                    </p>
                  ) : (
                    <p className={styles.price}>
                      S$ {propertyData.price.toLocaleString()}
                    </p>
                  )}
                  {/* <button className={styles.favoriteButton}>favorite</button> */}
                  {favIds.includes(params.id) ? (
                    <IconButton
                      onClick={toggleFavHandler.bind(this, params.id)}
                    >
                      <FavoriteOutlinedIcon color="primary" />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={toggleFavHandler.bind(this, params.id)}
                    >
                      <FavoriteBorderOutlinedIcon />
                    </IconButton>
                  )}
                </div>
                <div className={styles.horizontalContainerSpecificProperty}>
                  <p>
                    {propertyData.noOfBedrooms}{" "}
                    <img
                      className={styles.icon}
                      src="/assets/icons/bed-icon.png"
                      alt="bedIcon"
                    ></img>
                  </p>
                  <p>
                    {propertyData.noOfBaths}{" "}
                    <img
                      className={styles.icon}
                      src="/assets/icons/bath-icon.png"
                      alt="bathIcon"
                    ></img>
                  </p>
                  <p>• {propertyData.floorsize} sqft</p>
                  <p className={styles.availability}>• Available from</p>
                </div>
                <div className={styles.propertyCard}>
                  <p className={styles.fontLargeBold}>
                    {propertyData.propertyName}
                  </p>
                  <p className={styles.fontSmall}>
                    {propertyData.address}, {propertyData.postcode}, Singapore
                  </p>
                  <p>Distance to MRT</p>
                </div>
              </div>
              <p
                style={{
                  fontSize: "26px",
                  padding: "10px",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
              >
                Details
              </p>
              <div className={styles.detailsContainer}>
                <div className={styles.detailsCard}>
                  <p className={styles.detailsHead}>Type</p>
                  <p>
                    {propertyData.propertyType} for {propertyData.saleType}
                  </p>
                </div>
                <div className={styles.detailsCard}>
                  <p className={styles.detailsHead}>Tenure</p>
                  <p>{propertyData.tenure}</p>
                </div>
                <div className={styles.detailsCard}>
                  <p className={styles.detailsHead}>Floorsize</p>
                  <p>{propertyData.floorsize} sqft</p>
                </div>
                <div className={styles.detailsCard}>
                  <p className={styles.detailsHead}>Developer</p>
                  <p>N/A</p>
                </div>
                <div className={styles.detailsCard}>
                  <p className={styles.detailsHead}>PSF</p>
                  <p>S$ {propertyData.pricePSF.toLocaleString()} psf</p>
                </div>
                <div className={styles.detailsCard}>
                  <p className={styles.detailsHead}>TOP</p>
                  <p>{propertyData.TOPYear}</p>
                </div>
                <div className={styles.detailsCard}>
                  <p className={styles.detailsHead}>Listing ID</p>
                  <p>{propertyData.id}</p>
                </div>
                <div className={styles.detailsCard}>
                  <p className={styles.detailsHead}>Agent ID</p>
                  <p>{propertyData.sellerId}</p>
                </div>
                <div className={styles.detailsCard}>
                  <p className={styles.detailsHead}>Availability</p>
                  <p>N/A</p>
                </div>
                <div className={styles.detailsCard}>
                  <p className={styles.detailsHead}>Listed On</p>
                  <p>{date}</p>
                </div>
              </div>
            </div>
            {propertyData.User === undefined ? null : (
              <div className={styles.stickySidebar}>
                <div className={styles.sidebarSpecificProperty}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      className={styles.avatar}
                      src={`http://68.183.183.118:4088/img/users/${propertyData.User.photo}`}
                      alt="avatar"
                    ></img>
                    <div>
                      <p>
                        {propertyData.User.firstName}{" "}
                        {propertyData.User.lastName}
                      </p>
                      <p>ERA REALTY NETWORK PTE LTD </p>
                      <p>CEA: R027564Z / L3002382K</p>
                    </div>
                  </div>
                  <div
                    className={styles.whatsappButtonSpecificProperty}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.alert("Link to Whatsapp Web");
                    }}
                  >
                    <img
                      className={styles.icon}
                      src="/assets/icons/phone-icon.png"
                      alt="phoneIcon"
                    />
                    Whatsapp
                  </div>
                </div>
                <form className={styles.contactForm} onSubmit={handleSubmit}>
                  <input
                    required
                    placeholder="Name"
                    className={styles.input}
                    value={name}
                    onChange={handleChange}
                  ></input>
                  <input
                    required
                    placeholder="Mobile Number"
                    className={styles.input}
                    value={number}
                    onChange={handleChange}
                  ></input>
                  <input
                    required
                    placeholder="Email"
                    className={styles.input}
                    value={email}
                    onChange={handleChange}
                  ></input>
                  <button className={styles.submitContactButton}>
                    I'm Interested
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </Container>
  );
};

export default SpecificProperty;
