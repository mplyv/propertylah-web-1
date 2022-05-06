import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Properties from "./components/Properties/Properties";
import Articles from "./components/Articles/Articles";
import SignUp from "./components/Users/SignUp";
import Login from "./components/Users/Login";
import QnA from "./components/QnA/QnA";
import Sample from "./components/Sample/Sample";
import Profile from "./components/Users/Profile";

import { fetchAuth } from "./store/auth-thunks";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // load auth from localStoarge on App load
  useEffect(() => {
    dispatch(fetchAuth());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {!isAuthenticated && <Route path="/signup" element={<SignUp />} />}
        <Route path="/login" element={<Login />} />
        {isAuthenticated && <Route path="/profile" element={<Profile />} />}
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
