import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../index.css";
import classes from "./CategoryQuestions.module.css";
import heroClasses from "./HeroSection.module.css";
import API from "./API";

import Card from "../UI/Card";
import SearchBar from "./SearchBar/SearchBar";
import HeroSection from "./HeroSection";
import { timeSince } from "../UI/TimeSince";

const CategoryQuestions = (props) => {
  const [ loading, setLoading ] = useState(false);
  const [ categoryQuestions, setCategoryQuestions ] = useState([]);

  const { categoryId } = useParams();
  const auth = useSelector((state) => state.auth);

  // format categoryId in params
  const categoryIdMatch = categoryId.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ')

  useEffect (() => {
    async function getCategoryQuestions() {
      setLoading(true);
      const res = await API.get(`/questions/?category[eq]=${categoryIdMatch}`)
      // const res = await API.get(`/questions`, {
      //   params : {
      //     [category[eq]]: categoryId
      //   }
      // })
      const arr = res.data.data;
      setCategoryQuestions(arr);
      setLoading(false);
    }
    getCategoryQuestions()
  }, []);

  console.log(categoryQuestions)


  return (
    <>
    <article className={heroClasses["category-hero-container"]}>
      <div className={heroClasses["hero-inner"]}>
        { auth.isAuthenticated? <div className={heroClasses["category-p"]}>Welcome!</div> : <></> }
        <h1 className={heroClasses["category-h1"]}>
          { categoryId.replace(/([A-Z]+)/g, ' $1').trim() }
        </h1>
        
          { auth.isAuthenticated? <div className={heroClasses["category-p"]}>Hey {auth.firstName}, you can find all the { categoryId.replace(/([A-Z]+)/g, ' $1').trim() } questions here 😊</div> : <div className={heroClasses["category-p"]}>Welcome, we have all the questions you need. 😏</div>
          }        
      </div>
    </article>


    <div className={classes["main-container"]}>
      
      <SearchBar placeholder='Search a Question'/>
      { loading ? <div className={classes.loading}>Loading . . .</div> : (
        categoryQuestions.map((qn) => {
          return (
          <Link to={`/qna/${categoryId}/${qn.id}`} key={qn.id}>
          <div className={classes.container}>
            <div key={qn.id} className={classes["name-section"]}>
              <p className={classes.name}>
                {qn.firstName} {qn.lastName}
              </p>
              <div className={classes.category}>
                {qn.category}
              </div>
              <div className={classes["questionId-section"]}>
                <div className={classes.questionId}>
                  Question #{qn.id}
                </div>
              </div>
            </div>
            <div className={classes.meta}>
              <p>Updated {timeSince(new Date(qn.updatedAt))} ago •&nbsp;</p>
              <p>Asked {timeSince(new Date(qn.createdAt))} ago on {new Date(qn.createdAt).toDateString()}</p>
            </div>
            <div className={classes.question}>
              {qn.question}
            </div>
              </div>
          </Link>
          
        )}).slice().sort((a, b) => b.updatedAt > a.updatedAt ? 1 : -1)
      )}
      
    </div>
    </>
  )
  
}

export default CategoryQuestions;