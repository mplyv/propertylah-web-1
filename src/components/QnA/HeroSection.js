import React, { useEffect } from "react";
import classes from "./HeroSection.module.css";
import "../../index.css";
import { getQuestions } from "./API"

const HeroSection = ({ totalQuestions, setTotalQuestions, loading, setLoading }) => {
 
  useEffect(() => {
    async function getTotalQuestions() {
      setLoading(true);
      const req = await getQuestions();
      setTotalQuestions(req.data.data);
      return setLoading(false);
    }
    getTotalQuestions();
  }, [])

  return (
    <>
    <article className={classes["hero-container"]}>
      <div className={classes["hero-inner"]}>
        <h1>AskGuru Community</h1>
        { loading ? (
          <div>loading . . .</div>
        ) : ( totalQuestions?.length && ( 
          <h2><p className={classes.num}>{totalQuestions.length} questions and counting 😎</p></h2>
        ))}
        <p>Get answers from PropertyGuru experts in 24 hours </p>
        <button className={classes["hero-btn"]}>Ask Question Now</button>
      </div>
    </article>
    </>
  )
}

export default HeroSection;

// Alternative way to retrieve totalQuestions
  // async function getTotalQuestions() {
  //   try {
  //     setLoading(true);
  //     const res = await getQuestions();
  //     setTotalQuestions(res.data.data);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log("Oops", err);
  //   }
  // }

  // useEffect(() => {
  //   getTotalQuestions();
  // }, [])