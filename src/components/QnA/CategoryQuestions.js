import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import "../../index.css";
import classes from "./CategoryQuestions.module.css";
import heroClasses from "./HeroSection.module.css";
import sidebarImage1 from "../../assets/images/qna/askguru-question-banner.jpg";
import sidebarImage2 from "../../assets/images/qna/askguru-banner.jpg";
import sidebarImage3 from "../../assets/images/qna/askguru-side-banner.jpg";
import sidebarImage4 from "../../assets/images/qna/qna-banner-2.jpg";

import API from "./API";

import SearchBar from "./SearchBar/SearchBar";
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
        { auth.isAuthenticated? <div className={heroClasses["category-p"]}>Welcome, {auth.firstName}</div> : <></> }
        <h1 className={heroClasses["category-h1"]}>
          { categoryId.replace(/([A-Z]+)/g, ' $1').trim() }
        </h1>
        
          { auth.isAuthenticated? <div className={heroClasses["category-p"]}>There are {categoryQuestions.length} questions in here. Enjoy! 😊</div> : <div className={heroClasses["category-p"]}>Welcome, we have all the questions you need. 😏</div>
          }        
      </div>
    </article>

    <div className={classes.container}>
    <div className={classes["main-container"]}>
      <SearchBar placeholder='Search a Question'/>

      { loading ? <div className={classes.loading}>Loading . . .</div> : (
        
        categoryQuestions.map((qn, i) => {
          return (
          <>
          <Link to={`/qna/${categoryId}/${qn.id}`} key={qn.id}>
          <div className={classes["card-container"]}>
            <div key={qn.id} className={classes["name-section"]}>
              <Avatar className={classes.name}
                sx={{ width: 30, height: 30 }}
                src={`http://68.183.183.118:4088/img/users/${auth.photo}`}
              />
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
          </>
        )}).slice().sort((a, b) => b.updatedAt > a.updatedAt ? 1 : -1)
        
      )}
      
    </div>
    <div className={classes.sidebar}>
      {/* <div className={classes.sidebarContainer}> */}
        <Link to={`/qna`}>
        <img className={classes["sidebar-image"]} src={sidebarImage4} alt="askguru-side-banner" />
        </Link>
        <Link to={`/articles`}>
        <img className={classes["sidebar-image"]} src={sidebarImage1} alt="askguru-question-banner" />
        </Link>
        <img className={classes["sidebar-image"]} src={sidebarImage2} alt="askguru-question-banner" />
        <article className={classes.article}>
        <Link to={`/properties`}>
        <img className={classes["sidebar-image"]} src={sidebarImage3} alt="askguru-side-banner" />
        <p className={classes["sidebar-image-text"]}>View properties now</p>
        </Link>
        </article>
      </div>
    {/* </div> */}
    </div>
    </>
  )
}

export default CategoryQuestions;