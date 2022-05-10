import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  // this creates a new array of top-ranking users
  const rankUsers = ( outputQuestions, n ) => {
    if (n > outputQuestions.length) {
      return false;
    }
    return outputQuestions
    .slice()
    .sort((a, b) => {
      return b.numOfQuestions - a.numOfQuestions
    })
    .slice(0, 8)
  }
  const topUsers = rankUsers(outputQuestions, 8);
  console.log(topUsers);

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
    <h2 className={classes["header-section"]}>Question Categories</h2>
    <div className={classes["topics-container"]}>
    { !!results && (
      <div className={classes["topics-section"]}>
      { Object.keys(results).map((el, id) => {
        const getNumOfUsers = outputUsers[id];
        return (
          // <Link to={el} key={id}>
          <Link to={el.split(" ").join("")} key={id}>
          <div className={classes.card}>
            <div className={classes["card-body"]}>
              <div className={classes["card-category"]}>{el}</div>
              <div className={classes["card-desc-questions"]}>
                { results[el] == 1 ? ( <p>{results[el]} question</p> ) : ( <p>{results[el]} questions</p> )}
              </div>
              { getNumOfUsers.numOfUsers == 1 ? (
                <div className={classes["card-desc-persons"]}>{getNumOfUsers.numOfUsers} person is looking for advice</div> 
              ) : (
                <div className={classes["card-desc-persons"]}>{getNumOfUsers.numOfUsers} people are looking for answers</div>
              )
              } 
            </div>
          </div>
          </Link>
        )
      }
      )}

      </div>
    )}

    { !!topUsers && (
      <>
      <h2 className={classes["header-section"]}>Most Active Users</h2>
      <div className={classes["topics-section"]}>
        { topUsers.map((el, id) => {
          return (
            <Link to={`questions/${el.firstName.split(" ").join("")}`} key={id}>
            <div className={classes.card}>
              <div className={classes["card-body"]}>
                  <div className={classes["card-user"]}>
                    {el.firstName}
                    { id === 0 && 
                    <div className={classes["leading"]}>
                      Popular
                    </div>
                    }
                    <div className={classes["trend-category"]}>
                      Rank: {id + 1}
                    </div>
                  </div>
                  <div className={classes["card-desc-questions"]}>
                    <div>{el.numOfQuestions}</div> 
                    <div>&nbsp;questions asked</div>
                  </div>
              </div>
            </div>
            </Link>
          )
        })
        }
      </div>
      </>
    )}
        
    </div>
    </>
  );
};

export default CategorySection;