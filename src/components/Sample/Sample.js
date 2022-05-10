// import { Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/favorites-thunks";

import Container from "../UI/Container";
const Sample = () => {
  const auth = useSelector((state) => state.auth);
  const favIds = useSelector((state) => state.favorites.favIds);
  const dispatch = useDispatch();

  const [propertiesList, setPropertiesList] = useState([]);

  const toggleFavHandler = (id) => {
    if (!favIds.includes(id)) dispatch(addToFavorites(id));
    else dispatch(removeFromFavorites(id));
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://68.183.183.118:4088/api/v1/properties");
        const data = await res.json();

        setPropertiesList(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Container>
      <h1>The Sample Page</h1>
      <p>Welcome {auth.firstName}</p>
      {/* <p>Role: {auth.role}</p>
      <p>id: {auth.id}</p>
      <Link to="product-A">Product A</Link>
      <Routes>
        <Route path="product-A" element={<p>Product A</p>} />
      </Routes> */}
      <h2>Test Properties</h2>
      <ul>
        {propertiesList.map((property) => (
          <li key={property.id}>
            {property.id}{" "}
            {favIds.includes(property.id) ? (
              <IconButton onClick={toggleFavHandler.bind(this, property.id)}>
                <FavoriteOutlinedIcon color="primary" />
              </IconButton>
            ) : (
              <IconButton onClick={toggleFavHandler.bind(this, property.id)}>
                <FavoriteBorderOutlinedIcon />
              </IconButton>
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Sample;
