import Container from "../UI/Container";
import React, { useState, useEffect } from "react";
import classes from "./articles.module.css";
import { getArticles } from "./API"
import axios from "axios";




function Articles() {

  const [data, setData]=useState([]);

  const Articles = (props) => {
    return <div className={classes.articles}>{props.children}</div>;
  };

  useEffect(() => {
    const API_URL = "http://68.183.183.118:4088/api/v1/articles";
    
    async function getArticles(){
      const res = await axios.get(API_URL);
      console.log(res.data.data);
      setData(res.data.data)//saving data into array useState
    }

    getArticles();
  }, []);


  return (
    <Container>
      <h1>Articles
        </h1>


        {data.map((article)=> <> <h2>{article.review}</h2><br/>
        
        <p>{article.content}</p> <br/></>)}
        
        </Container>
          
       
  
  );
}



export default Articles;
