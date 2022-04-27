import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Container from "../UI/Container";
import classes from "./Profile.module.css";

const API_URL = "http://68.183.183.118:3088/api/v1/users/";
const defaultInputs = {
  name: "",
  email: "",
  role: "",
};

const Profile = () => {
  const authCtx = useContext(AuthContext);

  const [formInputs, setFormInputs] = useState(defaultInputs);

  const inputChangeHandler = (e) => {
    setFormInputs((prevInputs) => {
      const newInputs = { ...prevInputs };
      newInputs[e.target.name] = e.target.value;
      return newInputs;
    });
  };
  // check if user is logged in
  // if (!authCtx.isLoggedIn) return history.replace("/");

  // load user data
  useEffect(() => {
    const getUserData = async () => {
      try {
        console.log(`${API_URL}${authCtx.id}`);
        const res = await fetch(`${API_URL}${authCtx.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Request failed!");
        const data = await res.json();

        console.log(data);
        // set the inputs
        console.log(data.data.data.name);
        setFormInputs({
          name: data.data.data.name,
          email: data.data.data.email,
          role: data.data.data.role,
        });
      } catch (err) {
        console.log(err.message || "Something went wrong!");
      }
    };

    getUserData();
  }, [authCtx.id]);

  const saveProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}${authCtx.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formInputs.name,
          email: formInputs.email,
        }),
      });

      if (!res.ok) throw new Error("Request failed!");
      const data = await res.json();

      console.log(data);

      // save new data to context
      authCtx.login(authCtx.token, formInputs.name, authCtx.role, authCtx.id);
    } catch (err) {
      console.log(err.message || "Something went wrong!");
    }
  };

  return (
    <Container>
      <div className={classes.profile}>
        <h1>My Profile</h1>
        <form onSubmit={saveProfileHandler}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formInputs.name}
            onChange={inputChangeHandler}
            required
          ></input>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={formInputs.email}
            onChange={inputChangeHandler}
            required
          ></input>
          <label htmlFor="role">Role</label>
          <input
            id="role"
            name="role"
            type="text"
            value={formInputs.role}
            onChange={inputChangeHandler}
            disabled
          ></input>

          <button type="submit">Update</button>
        </form>
        <h2>My Orders</h2>
        <div>load orders here</div>
      </div>
    </Container>
  );
};

export default Profile;
