import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { clearAuth } from "../../store/auth-thunks";
import { favoritesActions } from "../../store/favorites-slice";

const AccountMenu = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(clearAuth());
    dispatch(favoritesActions.clearFavorites());
    navigate("/login");
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
            <Avatar
              sx={{ width: 40, height: 40 }}
              alt={auth.firstName}
              src={`http://68.183.183.118:4088/img/users/${auth.photo}`}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <h3>Welcome, {auth.firstName}!</h3>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/profile");
          }}
        >
          <Avatar
            sx={{ width: 25, height: 25 }}
            src={`http://68.183.183.118:4088/img/users/${auth.photo}`}
          />
          My Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate("/favorite-properties");
          }}
        >
          <ListItemIcon>
            <FavoriteBorderOutlinedIcon
              sx={{ width: 25, height: 25 }}
              color="red"
            />
          </ListItemIcon>
          Favorite Properties
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate("/credits");
          }}
        >
          <ListItemIcon>
            <MonetizationOnOutlinedIcon sx={{ width: 25, height: 25 }} />
          </ListItemIcon>
          Credits
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings sx={{ width: 25, height: 25 }} />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/admin");
          }}
        >
          <ListItemIcon>
            <Settings sx={{ width: 25, height: 25 }} />
          </ListItemIcon>
          Admin
        </MenuItem>
        <Divider />
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout sx={{ width: 25, height: 25 }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
