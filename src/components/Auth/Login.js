import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";

// MUI
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Container from "../UI/Container";
import { useLoginMutation } from "../../services/auth-service";
import { saveAuth } from "../../store/auth-thunks";

const defaultInputs = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [formInputs, setFormInputs] = useState(defaultInputs);
  const [rememberMe, setRememberMe] = useState(false);

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
      const user = await login(formInputs);
      if (!user.error) {
        setFormInputs(defaultInputs);
        dispatch(saveAuth(user.data.data, rememberMe));
        navigate("/profile");
      }
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
        <h1>Log in</h1>
        {isLoading && <CircularProgress />}
        {isError && (
          <Alert severity="error">
            Error:
            {error.data?.message
              ? error.data.message
              : " Please check your connection or try again later."}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={submitHandler}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formInputs.email}
            onChange={inputChangeHandler}
            // onFocus={()=>{}}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formInputs.password}
            onChange={inputChangeHandler}
          />
          <FormControlLabel
            control={<Checkbox value={rememberMe} color="primary" />}
            label="Remember me"
            name="rememberMe"
            onChange={() => {
              setRememberMe(!rememberMe);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <NavLink to="/signup">Don't have an account? Sign Up</NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
