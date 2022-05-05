import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../../index.css";
import classes from "./CategoryQuestions.module.css";
import { getQuestions } from "./API"
import API from "./API";

import Container from "../UI/Container";
import Card from "../UI/Card";
import SearchBar from "./SearchBar/SearchBar";
import { timeSince } from "../UI/TimeSince";

const CategoryQuestions = (props) => {
  const [ loading, setLoading ] = useState(false);
  const [ categoryQuestions, setCategoryQuestions ] = useState([]);

  const { categoryId } = useParams();

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
      const arr = res.data.data
      setCategoryQuestions(arr);
      setLoading(false)
    }
    getCategoryQuestions()
  }, []);

  console.log(categoryQuestions)

  return (
    <Container>
      <Card><h1>Hello { categoryId }</h1></Card>
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
      
      <Card><h1>Hello { categoryId }</h1></Card>
      <button>Hello</button>
    </Container>
    
  )
  
}

export default CategoryQuestions;