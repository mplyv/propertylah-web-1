import { useState, useEffect } from "react";
import "../../index.css";
import { getQuestions, getCategoryQuestions } from "./API"
import { useSelector } from "react-redux";

import Container from "../UI/Container";
import Card from "../UI/Card";
import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import SecondarySection from "./SecondarySection";
import CategoryQuestions from "./CategoryQuestions";
import SearchBar from "./SearchBar/SearchBar";

const QnAHome = () => {
  const [ totalQuestions, setTotalQuestions ] = useState([]);
  const [ questions, setQuestions ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);

  const auth = useSelector((state) => state.auth);

  return (
    <>
    <HeroSection 
      totalQuestions={totalQuestions} 
      setTotalQuestions={setTotalQuestions} 
      loading={loading}
      setLoading={setLoading}
      showModal={showModal}
      setShowModal={setShowModal}
      auth={auth}
      />
    <CategorySection 
      questions={questions} 
      setQuestions={setQuestions}       
      totalQuestions={totalQuestions} 
      />
    <SecondarySection />
    </>
  );
};

export default QnAHome;
