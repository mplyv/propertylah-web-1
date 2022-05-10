import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

// mui
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";

// RTK
import { authActions } from "../../store/auth-slice";
import {
  useLazyGetMeQuery,
  useUpdateMeMutation,
} from "../../services/user-service";
import { fetchFavorites } from "../../store/favorites-thunks";
import Container from "../UI/Container";

const defaultInputs = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  photo: "",
};

const Input = styled("input")({
  display: "none",
});

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [
    updateMe,
    {
      isLoading: isUpdateMeLoading,
      isError: isUpdateMeError,
      isSuccess: isUpdateMeSuccess,
      error: updateMeError,
    },
  ] = useUpdateMeMutation();

  const [formInputs, setFormInputs] = useState(defaultInputs);
  const [file, setFile] = useState();
  const [getMe] = useLazyGetMeQuery();

  const updateStateData = useCallback(() => {
    getMe()
      .unwrap()
      .then((user) => {
        // update form
        setFormInputs({
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          role: user.data.role,
          photo: user.data.photo,
          email: user.data.email,
        });

        // update auth
        dispatch(
          authActions.saveAuth({
            firstName: user.data.firstName,
            lastName: user.data.lastName,
            role: user.data.role,
            photo: user.data.photo,
            email: user.data.email,
            id: user.data.id,
            token: auth.token,
          })
        );
      })
      .catch((error) => {
        console.log("Error updating my details", error);
      });
  }, [auth.token, dispatch, getMe]);

  useEffect(() => {
    console.log("[Profile.js] loading your data...");
    dispatch(fetchFavorites());
    updateStateData();
  }, [updateStateData, dispatch]);

  const inputChangeHandler = (e) => {
    setFormInputs((prevInputs) => {
      const newInputs = { ...prevInputs };
      newInputs[e.target.name] = e.target.value;
      return newInputs;
    });
  };

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const submitFileHandler = () => {
    const formData = new FormData();
    formData.append("firstName", formInputs.firstName);
    formData.append("photo", file);

    updateMe(formData).then(() => {
      updateStateData();
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    updateMe(formInputs).then(() => {
      updateStateData();
    });
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
        <h1>My Profile</h1>
        {isUpdateMeLoading && (
          <>
            <CircularProgress />
            Saving Your Profile...
          </>
        )}
        {isUpdateMeError && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {updateMeError.data?.message
              ? updateMeError.data.message
              : " Please check your connection or try again later."}
          </Alert>
        )}
        {isUpdateMeSuccess && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Your profile has been updated.
          </Alert>
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
            <Grid item xs={12} sm={12}>
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

            <Grid item xs={12} sm={6}>
              <Stack direction="row" spacing={10}>
                <Grid>
                  {isUpdateMeLoading && (
                    <Skeleton variant="circular" width={150} height={150} />
                  )}
                  {!isUpdateMeLoading && (
                    <Avatar
                      sx={{ width: 150, height: 150 }}
                      src={`http://68.183.183.118:4088/img/users/${auth.photo}`}
                    />
                  )}
                </Grid>
                <Stack spacing={2}>
                  <div>{file && <p>Selected file: {file.name}</p>}</div>
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={fileChangeHandler}
                    />
                    <Button variant="contained" component="span">
                      Select Avatar
                    </Button>
                  </label>
                  <label htmlFor="save-button-file">
                    <Button
                      id="save-button-file"
                      variant="contained"
                      component="span"
                      onClick={submitFileHandler}
                    >
                      Upload Avatar
                    </Button>
                  </label>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
