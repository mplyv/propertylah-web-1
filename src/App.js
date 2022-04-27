import { Route, Routes } from "react-router-dom";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

import Home from "./components/Home/Home";
import Properties from "./components/Properties/Properties";
import Articles from "./components/Articles/Articles";
import SignUp from "./components/Users/SignUp";
import Login from "./components/Users/Login";
import QnA from "./components/QnA/QnA";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/qna" element={<QnA />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
