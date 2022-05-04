import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Container from "../UI/Container";
const Sample = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <Container>
      <h1>The Sample Page</h1>
      <p>Welcome {auth.firstName}</p>
      <p>Role: {auth.role}</p>
      <p>id: {auth.id}</p>
      <Link to="product-A">Product A</Link>
      <Routes>
        <Route path="product-A" element={<p>Product A</p>} />
      </Routes>
    </Container>
  );
};

export default Sample;
