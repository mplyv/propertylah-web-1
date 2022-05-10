import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
// import Home from "./components/Home/Home";
import Properties from "./components/Properties/Properties";
import Articles from "./components/Articles/Articles";
import QnA from "./components/QnA/QnA";
import Sample from "./components/Sample/Sample";
import Profile from "./components/Users/Profile";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import FavoriteProperties from "./components/Users/FavoriteProperties";
import Credits from "./components/Users/Credits";
import Admin from "./components/Admin/Admin";

import { fetchAuth } from "./store/auth-thunks";
import { fetchFavorites } from "./store/favorites-thunks";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // load auth from localStorage on App load
  useEffect(() => {
    dispatch(fetchAuth());
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        {!isAuthenticated && <Route path="/" element={<Login />} />}
        {isAuthenticated && <Route path="/" element={<Profile />} />}
        {!isAuthenticated && <Route path="/signup" element={<Signup />} />}
        <Route path="/login" element={<Login />} />
        {isAuthenticated && <Route path="/profile" element={<Profile />} />}
        {isAuthenticated && <Route path="/credits" element={<Credits />} />}
        {isAuthenticated && (
          <Route path="/favorite-properties" element={<FavoriteProperties />} />
        )}
        {isAuthenticated && <Route path="/admin" element={<Admin />} />}
        <Route path="/properties/*" element={<Properties />} />
        <Route path="/qna/*" element={<QnA />} />
        <Route path="/articles/*" element={<Articles />} />
        <Route path="/sample/*" element={<Sample />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
