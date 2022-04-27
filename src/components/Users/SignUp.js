import { useState } from "react";
import Container from "../UI/Container";
import classes from "./SignUp.module.css";

const API_URL = "http://68.183.183.118:3088/api/v1/users/signup";

const defaultInputs = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  role: "user",
};

const SignUp = () => {
  const [signupSuccess, setSignupSuccess] = useState(false);

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
    console.log(formInputs);
    // TODO: validate inputs
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          name: formInputs.name,
          email: formInputs.email,
          password: formInputs.password,
          passwordConfirm: formInputs.passwordConfirm,
          role: formInputs.role,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);

      const data = await res.json();
      // update state
      if (res.ok) setSignupSuccess(true);
      console.log(data);
      // data.status success,  data.token
    } catch (err) {
      console.log(err);
    }

    // or just redirect user to homepage using History

    // clear inputs
    setFormInputs(defaultInputs);
  };

  return (
    <Container>
      <div className={classes.signup}>
        <h1>Sign Up</h1>
        <form onSubmit={submitHandler}>
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
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formInputs.password}
            onChange={inputChangeHandler}
            required
          ></input>
          <label htmlFor="password-confirm">Confirm Password</label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            value={formInputs.passwordConfirm}
            onChange={inputChangeHandler}
            required
          ></input>
          <button type="submit">Sign Up</button>
        </form>
        {signupSuccess && <p>Sign up success!</p>}
      </div>
    </Container>
  );
};

export default SignUp;
