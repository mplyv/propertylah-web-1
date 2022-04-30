import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import classes from "./CategorySection.module.css";
import "../../index.css";
import { getQuestions } from "./API";
import CategoryQuestions from "./CategoryQuestions";

const CategorySection = ({ questions, setQuestions, totalQuestions }) => {

  useEffect(() => {
    let mounted = true
    getQuestions()
      .then( items => {
        if(mounted) {
          setQuestions(items.data.data);
        }
      })
    return () => mounted = false;
  }, [totalQuestions])

  // elegant way of storing unique values
  // const cats = [ ...new Set(questions.map( e => e.category))];
 
  // counting num of questions for each category
  const results = {};
  for (const { category } of questions) {
    results[category] = ( results[category] || 0 ) + 1
  }
  console.log(results)
  // groupBy function (for counting questions and counting users)
  function groupBy( a, fn ) {
    const groups = {};
    a.forEach(function(el) {
      const key = fn(el);
      if (key in groups === false) {
        groups[key] = [];
      }
      groups[key].push(el);
    })
    return groups;
  }

  // this counts number of questions each unique user has posted
  const byName = groupBy(questions.filter(e => e.category), e => e["firstName"])

  const outputQuestions = Object.keys(byName).map(fname => {
    const byQuestion = groupBy(byName[fname], e => e.question);
    return {
      "firstName": fname,
      numOfQuestions: Object.keys(byQuestion).length,
    }
  })

  console.log(outputQuestions)

  // this counts number of unique users in each category
  const byCat = groupBy(questions.filter(e => e.firstName), e => e["category"])

  const outputUsers = Object.keys(byCat).map(cat => {
    const byUser = groupBy(byCat[cat], e => e.firstName);
    return {
      "category": cat,
      numOfUsers: Object.keys(byUser).length,
    }
  })

  console.log(outputUsers)

  return (
    <>
    <div className={classes["topics-container"]}>
    { !!results && (
    <div className={classes["topics-section"]}>
    { Object.keys(results).map((el, id) => {
      const getNumOfUsers = outputUsers[id];
      return (
        <div className={classes.card} key={id}>
          <div className={classes["card-body"]}>
            <Link to={el}>{el}</Link>
            <div>{results[el]} questions</div>
            { getNumOfUsers.numOfUsers == 1 ? (
            <div>{getNumOfUsers.numOfUsers} person is looking for advice</div> ) : (
              <div>{getNumOfUsers.numOfUsers} people are looking for answers</div>
            )
            }
          </div>
        </div>
      )
    }
    )}

    </div>
    )}
        
    </div>
    <hr />

    </>
  );
};

export default CategorySection;