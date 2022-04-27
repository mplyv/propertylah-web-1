import { Routes, Route, Link } from "react-router-dom";

import Container from "../UI/Container";
const Sample = () => {
  return (
    <Container>
      <h1>The Sample Page</h1>
      <Link to="product-A">Product A</Link>
      <Routes>
        <Route path="product-A" element={<p>Product A</p>} />
      </Routes>
    </Container>
  );
};

export default Sample;
