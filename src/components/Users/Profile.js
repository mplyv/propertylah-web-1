import { useEffect, useState } from "react";
import Container from "../UI/Container";
import classes from "./Profile.module.css";

const defaultInputs = {
  name: "",
  email: "",
  role: "",
};

const Profile = () => {
  const [formInputs, setFormInputs] = useState(defaultInputs);

  useEffect(() => {
    console.log("[Profile.js] Loaded");
  }, []);

  const inputChangeHandler = (e) => {
    setFormInputs((prevInputs) => {
      const newInputs = { ...prevInputs };
      newInputs[e.target.name] = e.target.value;
      return newInputs;
    });
  };

  const saveProfileHandler = async (e) => {
    e.preventDefault();
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
      </div>
    </Container>
  );
};

export default Profile;
