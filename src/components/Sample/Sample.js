// import { Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/favorites-thunks";

import Container from "../UI/Container";
import classes from "./Sample.module.css";

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
      <h2>All Properties</h2>
      <div className={classes.cardContainer}>
        {propertiesList.map((property) => (
          <Card sx={{ width: 300 }} key={property.id}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={`http://68.183.183.118:4088/img/properties/prop${property.id}.jpg`}
                alt="property"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {property.propertyName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem Ipsum
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              {favIds.includes(property.id) ? (
                <IconButton onClick={toggleFavHandler.bind(this, property.id)}>
                  <FavoriteOutlinedIcon color="primary" />
                </IconButton>
              ) : (
                <IconButton onClick={toggleFavHandler.bind(this, property.id)}>
                  <FavoriteBorderOutlinedIcon />
                </IconButton>
              )}
            </CardActions>
          </Card>

          // <li key={property.id}>
          //   {property.id}{" "}
          //   {favIds.includes(property.id) ? (
          //     <IconButton onClick={toggleFavHandler.bind(this, property.id)}>
          //       <FavoriteOutlinedIcon color="primary" />
          //     </IconButton>
          //   ) : (
          //     <IconButton onClick={toggleFavHandler.bind(this, property.id)}>
          //       <FavoriteBorderOutlinedIcon />
          //     </IconButton>
          //   )}
          // </li>
        ))}
      </div>
    </Container>
  );
};

export default Sample;
