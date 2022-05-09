import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/propertylahlogo.png";
import classes from "./Header.module.css";

import AccountMenu from "./AccountMenu";

const Header = (props) => {
  const auth = useSelector((state) => state.auth);

  return (
    <header className={classes.header}>
      <NavLink to="/">
        <img src={Logo} className={classes.logo} alt="propertylah logo" />
      </NavLink>

      <div className={classes["main-nav"]}>
        <ul className={classes["main-nav-list"]}>
          {!auth.isAuthenticated && (
            <>
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
              <li>
                <NavLink to="/login">Log In</NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/properties">Properties</NavLink>
          </li>
          {auth.isAuthenticated ? (
            <li>
              <NavLink to={`/properties/agent/${auth.id}`}>
                My Properties
              </NavLink>
            </li>
          ) : null}
          <li>
            <NavLink to="/qna">Q & A</NavLink>
          </li>
          <li>
            <NavLink to="/articles">Articles</NavLink>
          </li>
          <li>
            <NavLink to="/sample">Sample</NavLink>
          </li>

          {auth.isAuthenticated && <AccountMenu />}
        </ul>
      </div>
    </header>
  );
};

export default Header;
