import { useState } from "react";

// import AuthContext from "../../store/auth-context";
import Container from "../UI/Container";
import classes from "./Login.module.css";

const API_URL = "http://68.183.183.118:3088/api/v1/users/login";

const defaultInputs = {
  email: "",
  password: "",
};

const Login = () => {
  // const [loginErr, setLoginErr] = useState(null);

  const [formInputs, setFormInputs] = useState(defaultInputs);

  const inputChangeHandler = (e) => {
    setFormInputs((prevInputs) => {
      const newInputs = { ...prevInputs };
      newInputs[e.target.name] = e.target.value;
      return newInputs;
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // TODO: validate inputs
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          email: formInputs.email,
          password: formInputs.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("[Login.js] res ", res);

      const data = await res.json();
      // update state
      if (data.status === "success") {
        console.log(data);

        // save to context
        // authCtx.login(
        //   data.token,
        //   data.data.user.name,
        //   data.data.user.role,
        //   data.data.user._id
        // );
      }

      // data.status success,  data.token
    } catch (err) {
      console.log(err.message);
    }

    // clear inputs
    // setFormInputs(defaultInputs);
  };

  return (
    <Container>
      <div className={classes.login}>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={formInputs.email}
            onChange={inputChangeHandler}
            required
          ></input>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formInputs.password}
            onChange={inputChangeHandler}
            required
          ></input>
          <button type="submit">Login</button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
