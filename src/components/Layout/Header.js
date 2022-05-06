import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/propertylahlogo.png";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";

import { clearAuth } from "../../store/auth-thunks";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const Header = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState("false");

  useEffect(() => {
    if (isAuthenticated) setIsLoggedIn(true);
  }, [isAuthenticated]);

  const logoutHandler = () => {
    console.log("logging out");
    dispatch(clearAuth());
    setIsLoggedIn(false);
    navigate("/sample");
  };

  return (
    <header className={classes.header}>
      <NavLink to="/">
        <img src={Logo} className={classes.logo} alt="propertylah logo" />
      </NavLink>

      <div className={classes["main-nav"]}>
        <ul className={classes["main-nav-list"]}>
          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
              <li>
                <NavLink to="/login">Log In</NavLink>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/properties">Properties</NavLink>
          </li>
          {isAuthenticated?
            <li>
              <NavLink to="/properties/agent/47">My Properties</NavLink>
            </li>
          :null}
          <li>
            <NavLink to="/qna">Q & A</NavLink>
          </li>
          <li>
            <NavLink to="/articles">Articles</NavLink>
          </li>
          <li>
            <NavLink to="/sample">Sample</NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <Button variant="contained" onClick={logoutHandler}>
                Log Out
              </Button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
