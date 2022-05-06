import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveAuth } from "../../store/auth-thunks";
import { NavLink } from "react-router-dom";

// MUI
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Container from "../UI/Container";
// import classes from "./Login.module.css";
import { useSignupMutation } from "../../services/auth-service";

const defaultInputs = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

const Signup = () => {
  const dispatch = useDispatch();

  const [signup, { isLoading, isError, error }] = useSignupMutation();
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

    try {
      const user = await signup(formInputs);
      if (!user.error) dispatch(saveAuth(user.data.data));

      // signup success - to profile page
    } catch (error) {
      // api call error - error connecting - pls check your network or try again later.
      console.log("catch error", error);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <h1>Sign up</h1>
        {isLoading && <CircularProgress />}
        {isError && (
          <Alert severity="error">Error: {error.data.message} </Alert>
        )}
        <Box
          component="form"
          noValidate
          onSubmit={submitHandler}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={formInputs.firstName}
                onChange={inputChangeHandler}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={formInputs.lastName}
                onChange={inputChangeHandler}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formInputs.email}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formInputs.password}
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/login">Already have an account? Log in</NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
