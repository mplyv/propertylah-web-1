import Container from "../UI/Container";
import FilterBar from "./components/FilterBar";
import { useNavigate } from "react-router-dom";

import API from "./API.js";
import styles from "./property.module.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PopupComponent from "./components/PopupComponent";
import ImageViewer from "./components/ImageViewer";
import Modal from "../QnA/Modal";
import { useSelector, useDispatch } from "react-redux";
import FavoriteProperties from "../Users/FavoriteProperties";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/favorites-thunks";

const PropertyList = (props) => {
  const auth = useSelector((state) => state.auth);
  const favIds = useSelector((state) => state.favorites.favIds);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const toggleFavHandler = (id) => {
    if (!favIds.includes(id)) dispatch(addToFavorites(id));
    else dispatch(removeFromFavorites(id));
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const [data, setData] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minFloorsize, setMinFloorsize] = useState("");
  const [maxFloorsize, setMaxFloorsize] = useState("");
  const [minPSF, setMinPSF] = useState("");
  const [maxPSF, setMaxPSF] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [noOfBathrooms, setNoOfBathrooms] = useState("All");
  const [noOfBedrooms, setNoOfBedrooms] = useState("All");
  const [propertyType, setPropertyType] = useState("All");
  const [tenure, setTenure] = useState("All");
  const params = useParams();
  const sellerId = params.sellerId;

  //! props coming from links. 3 possibilities (All, Sale, Rent). render changes depending on which path taken.
  //* Initial populate + rerender every filter
  useEffect(() => {
    async function fetchData() {
      let connectAPI = await API.get("/properties");
      let APIdata = connectAPI.data.data;
      let filtered = APIdata;

      if (sellerId !== undefined) {
        filtered = APIdata.filter(
          (propertyObj) => propertyObj.sellerId === parseInt(sellerId)
        );
      }
      if (props.path === "All") {
        // return all
      } else {
        filtered = APIdata.filter(
          (propertyObj) => propertyObj.saleType === props.path
        );
      }
      if (propertyType !== "All") {
        filtered = filtered.filter(
          (propertyObj) => propertyObj.propertyType === propertyType
        );
      }
      if (noOfBedrooms === "All") {
        // return all
      } else if (noOfBedrooms === "5") {
        filtered = filtered.filter(
          (propertyObj) => propertyObj.noOfBedrooms >= parseInt(noOfBedrooms)
        );
      } else {
        filtered = filtered.filter(
          (propertyObj) => propertyObj.noOfBedrooms === parseInt(noOfBedrooms)
        );
      }
      if (noOfBathrooms === "All") {
        // return all
      } else if (noOfBathrooms === "5") {
        filtered = filtered.filter(
          (propertyObj) => propertyObj.noOfBathrooms >= parseInt(noOfBathrooms)
        );
      } else {
        filtered = filtered.filter(
          (propertyObj) => propertyObj.noOfBaths === parseInt(noOfBathrooms)
        );
      }
      if (minPrice === "" && maxPrice === "") {
        // return all
      } else if (minPrice === "") {
        filtered = filtered.filter(
          (propertyObj) => propertyObj.price <= maxPrice
        );
      } else if (maxPrice === "") {
        filtered = filtered.filter(
          (propertyObj) => propertyObj.price >= minPrice
        );
      } else {
        filtered = filtered.filter(
          (propertyObj) =>
            propertyObj.price >= minPrice && propertyObj.price <= maxPrice
        );
      }
      if (minPSF === "" && maxPSF === "") {
        // return all
      } else if (minPSF === "") {
        filtered = filtered.filter(
          (propertyObj) => propertyObj.pricePSF <= maxPSF
        );
      } else if (maxPSF === "") {
        filtered = filtered.filter(
          (propertyObj) => propertyObj.pricePSF >= minPSF
        );
      } else {
        filtered = filtered.filter(
          (propertyObj) =>
            propertyObj.pricePSF >= minPSF && propertyObj.pricePSF <= maxPSF
        );
      }
      if (minFloorsize === "" && maxFloorsize === "") {
        // return all
      } else if (minFloorsize === "") {
        filtered = filtered.filter(
          (propertyObj) => propertyObj.floorsize <= maxFloorsize
        );
      } else if (maxFloorsize === "") {
        filtered = filtered.filter(
          (propertyObj) => propertyObj.floorsize >= minFloorsize
        );
      } else {
        filtered = filtered.filter(
          (propertyObj) =>
            propertyObj.floorsize >= minFloorsize &&
            propertyObj.floorsize <= maxFloorsize
        );
      }
      if (minYear === "" && maxYear === "") {
        // return all
      } else if (minYear === "") {
        filtered = filtered.filter(
          (propertyObj) => propertyObj.TOPYear <= maxYear
        );
      } else if (maxYear === "") {
        filtered = filtered.filter(
          (propertyObj) => propertyObj.TOPYear >= minYear
        );
      } else {
        filtered = filtered.filter(
          (propertyObj) =>
            propertyObj.TOPYear >= minYear && propertyObj.TOPYear <= maxYear
        );
      }
      if (tenure !== "All") {
        filtered = filtered.filter(
          (propertyObj) => propertyObj.tenure === tenure
        );
      }
      setData(filtered);
    }
    fetchData();
  }, [
    props.path,
    minPrice,
    maxPrice,
    minFloorsize,
    maxFloorsize,
    minPSF,
    maxPSF,
    minYear,
    maxYear,
    noOfBathrooms,
    noOfBedrooms,
    propertyType,
    tenure,
    sellerId,
  ]);

  return props.path === "All" && parseInt(sellerId) !== auth.id ? null : (
    <Container>
      <FilterBar
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        noOfBedrooms={noOfBedrooms}
        setNoOfBedrooms={setNoOfBedrooms}
        noOfBathrooms={noOfBathrooms}
        setNoOfBathrooms={setNoOfBathrooms}
        tenure={tenure}
        setTenure={setTenure}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        minFloorsize={minFloorsize}
        setMinFloorsize={setMinFloorsize}
        maxFloorsize={maxFloorsize}
        setMaxFloorsize={setMaxFloorsize}
        minPSF={minPSF}
        setMinPSF={setMinPSF}
        maxPSF={maxPSF}
        setMaxPSF={setMaxPSF}
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}
      />
      <div className={styles.mainContainer}>
        <div className={styles.cardContainer}>
          <div>
            <p>
              {data.length} Properties{" "}
              {props.path === "All" ? null : `for ${props.path}`} found in
              Singapore
            </p>
            {data.map((propertyData) => {
              return (
                <div
                  className={styles.propertyContainer}
                  key={propertyData.id}
                  onClick={() => {
                    if (parseInt(params.sellerId) === propertyData.sellerId) {
                      navigate(
                        `/properties/agent/${params.sellerId}/${propertyData.id}`
                      );
                    } else {
                      navigate(`/properties/rent/${propertyData.id}`);
                    }
                  }}
                >
                  <div style={{ height: "480px" }}>
                    {/* //todo this should come from API */}
                    <ImageViewer
                      source={[
                        "/assets/property-images/Sky-Vue-Ang-Mo-Kio-Bishan-Thomson-Singapore-1.jpg",
                        "/assets/property-images/Sky-Vue-Ang-Mo-Kio-Bishan-Thomson-Singapore-2.jpg",
                        "/assets/property-images/Sky-Vue-Ang-Mo-Kio-Bishan-Thomson-Singapore-3.jpg",
                        "/assets/property-images/Sky-Vue-Ang-Mo-Kio-Bishan-Thomson-Singapore-4.jpg",
                      ]}
                    />
                  </div>
                  <div className={styles.propertyCard}>
                    <div
                      className={styles.horizontalContainer}
                      style={{ justifyContent: "space-between" }}
                    >
                      <p className={styles.fontLargeBold}>
                        {propertyData.propertyName}
                      </p>
                      {/* <button className={styles.favoriteButton}>
                        favorite
                      </button> */}
                      {favIds.includes(propertyData.id) ? (
                        <IconButton
                          onClick={toggleFavHandler.bind(this, propertyData.id)}
                        >
                          <FavoriteOutlinedIcon color="primary" />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={toggleFavHandler.bind(this, propertyData.id)}
                        >
                          <FavoriteBorderOutlinedIcon />
                        </IconButton>
                      )}
                    </div>
                    <p className={styles.fontSmall}>
                      {propertyData.address}, {propertyData.postcode}, Singapore
                    </p>
                    <div className={styles.horizontalContainer}>
                      {propertyData.saleType === "Rent" ? (
                        <p>S$ {propertyData.price.toLocaleString()} /mo</p>
                      ) : (
                        <p>S$ {propertyData.price.toLocaleString()}</p>
                      )}
                      <p className={styles.availability}>??? Available from</p>
                    </div>
                    <div className={styles.horizontalContainer}>
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
                      <p>??? {propertyData.floorsize} sqft</p>
                      <p>??? S$ {propertyData.pricePSF} psf</p>
                    </div>
                    <p>Distance to MRT</p>
                  </div>
                  <div className={styles.agentCard}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <img
                        className={styles.avatar}
                        src={`http://68.183.183.118:4088/img/users/${propertyData.User.photo}`}
                        alt="avatar"
                      ></img>
                      <div>
                        <p>
                          Listed by {propertyData.User.firstName}{" "}
                          {propertyData.User.lastName}
                        </p>
                        <p>'Great Property!!'</p>
                      </div>
                    </div>
                    {/* //* stopPropagation used to prevent parent parent div onClick from being triggered */}
                    <div
                      className={styles.whatsappButton}
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
                </div>
              );
            })}
          </div>
          {params.sellerId ? (
            <div
              className={styles.stickySidebar}
              style={{ backgroundColor: "white" }}
            >
              <div className={styles.sidebarSpecificProperty}>
                <PopupComponent name="Add A Property" propertyData={""} />
              </div>
            </div>
          ) : (
            <div className={styles.sidebar}>
              <img
                src="/assets/icons/AskGuruLogo.svg"
                alt="askGuru"
                className={styles.sidebarImage}
              ></img>
              <p style={{ fontSize: "22px", padding: "10px" }}>
                How Do I Rent A Property In Singapore
              </p>
              <p style={{ padding: "10px", fontSize: "14px" }}>
                Get answers from PropertyLah experts
              </p>
              <button className={styles.sidebarButtons} onClick={openModal}>
                Ask a Question
              </button>
              <button
                className={styles.sidebarButtons}
                onClick={() => navigate("/qna")}
              >
                Browse Answers
              </button>
            </div>
          )}
        </div>
        {showModal ? <Modal setShowModal={setShowModal} /> : null}
      </div>
    </Container>
  );
};

export default PropertyList;
