import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../../index.css";
import classes from "./UserQuestions.module.css";
import heroClasses from "./HeroSection.module.css";
import API from "./API";

import Container from "../UI/Container";
import { timeSince } from "../UI/TimeSince";


const UserQuestions = () => {
  const [ loading, setLoading ] = useState(false);
  const [ userQuestions, setUserQuestions ] = useState([]);

  const { firstName } = useParams();

  const firstNameMatch = firstName.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ')

  useEffect(() => {
    async function getUserQuestions() {
      setLoading(true);
      const res = await API.get(`/questions/?firstName[eq]=${firstNameMatch}`)
      const arr = res.data.data;
      setUserQuestions(arr);
      setLoading(false);
    }
    getUserQuestions();
  }, []);

  console.log(userQuestions);

  return (
    <>
      <article className={heroClasses["user-questions-hero-container"]}>
      <div className={heroClasses["hero-inner"]}>
        <div className={heroClasses["category-p"]}>Here's all the questions by</div>
        <div className={heroClasses["category-h2"]}>{ firstName.replace(/([A-Z]+)/g, ' $1').trim() } </div>

        <div className={classes["tags-section"]}>
        <Link to={`/qna/questions/${firstName}`}>
        <div className={classes["trend-category"]}>
          Asked {userQuestions.length} <div> &nbsp;questions </div>
          &nbsp;so far
        </div>
        </Link>
        {/* <Link to={`/qna/${categoryId.split(" ").join("")}`}>
        <div className={classes["trend-category"]}>
          { categoryId.replace(/([A-Z]+)/g, ' $1').trim() }
        </div>  
        </Link>           */}
        </div>
      </div>
      </article>

      { loading ? <div className={classes.loading}>Loading . . .</div> : (
        userQuestions.map((qn) => {
          return (
          <Link to={`/qna/${qn.category.split(" ").join("")}/${qn.id}`} key={qn.id}>
          <div className={classes.container}>
          <div className={classes["main-container"]}>
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
          </div>
          </Link>
          
        )}).slice().sort((a, b) => b.updatedAt > a.updatedAt ? 1 : -1)
      )}
    </>
  );
};

export default UserQuestions;