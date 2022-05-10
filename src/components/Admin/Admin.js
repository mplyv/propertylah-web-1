import { useEffect } from "react";
import { useGetAllUsersQuery } from "../../services/user-service";

import Container from "../UI/Container";
// mui
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import classes from "./Admin.module.css";

const Admin = () => {
  // Show RTKQ Cache
  // Load all users + refresh button
  const { data: users, isSuccess, isLoading } = useGetAllUsersQuery();

  // const {
  //   data: post,
  //   isFetching,
  //   isLoading,
  // } = useGetPostQuery(id, {
  //   pollingInterval: 3000,
  //   refetchOnMountOrArgChange: true,
  //   skip: false,
  // })

  return (
    <Container>
      <h1>Users</h1>
      {isLoading && <CircularProgress />}
      <div className={classes.cardContainer}>
        {isSuccess &&
          users.data.map((user) => (
            <Card key={user.id} sx={{ width: 300 }}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ width: 50, height: 50 }}
                    src={`http://68.183.183.118:4088/img/users/${user.photo}`}
                  />
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={`${user.firstName} ${user.lastName}`}
                subheader={user.role}
              />

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </div>
    </Container>
  );
};

export default Admin;
