import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "../UI/Container";
import classes from "./FavoriteProperties.module.css";

// mui
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/favorites-thunks";

const FavoriteProperties = () => {
  const [propertiesData, setPropertiesData] = useState([]);
  const favIds = useSelector((state) => state.favorites.favIds);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const toggleFavHandler = (id) => {
    if (!favIds.includes(id)) dispatch(addToFavorites(id));
    else dispatch(removeFromFavorites(id));
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://68.183.183.118:4088/api/v1/properties");
        const data = await res.json();

        const filteredData = data.data.filter((property) =>
          favIds.includes(property.id)
        );
        setPropertiesData(filteredData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperties();
  }, [favIds]);

  return (
    <Container>
      <h1>My Favorite Properties</h1>
      {isLoading && <CircularProgress />}

      <div className={classes.cardContainer}>
        {propertiesData.length === 0 && <p>No favorite properties.</p>}
        {propertiesData.length > 0 &&
          propertiesData.map((property) => (
            <Card key={property.id} sx={{ width: 350 }}>
              <CardHeader
                title={property.propertyName}
                subheader="September 14, 2016"
              />
              <CardMedia
                component="img"
                height="150"
                image={`http://68.183.183.118:4088/img/properties/prop${property.id}.jpg`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Lorem Ipsum
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton onClick={toggleFavHandler.bind(this, property.id)}>
                  <FavoriteOutlinedIcon color="primary" />
                </IconButton>
                <IconButton>
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
      </div>
    </Container>
  );
};

export default FavoriteProperties;
