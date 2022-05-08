import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "../../index.css";
import { getQuestions, getCategoryQuestions } from "./API"

import Container from "../UI/Container";
import Card from "../UI/Card";
import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import QnAHome from "./QnAHome";
import CategoryQuestions from "./CategoryQuestions";
import SpecificQuestion from "./SpecificQuestion";
import UserQuestions from "./UserQuestions";

const QnA = () => {
  return (
    <>
    <Routes>
      <Route path="*" element={<QnAHome />} />
      <Route path=":categoryId/*" element={<CategoryQuestions />} />
        <Route path=":categoryId/:id/*" element={<SpecificQuestion />} />
      <Route path="questions/:firstName/*" element={<UserQuestions />} />
    </Routes>
    </>
  );
};

export default QnA;
