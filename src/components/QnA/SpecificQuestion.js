import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import classes from "./SpecificQuestions.module.css";
import API from "./API";

import Container from "../UI/Container";
import QuestionForm from "./QuestionForm";
import { slideToggle } from "../UI/SlideToggle";
import { timeSince } from "../UI/TimeSince";

const SpecificQuestion = () => {
  const [ specificQuestion, setSpecificQuestion ] = useState([]);
  const [ specificAnswers, setSpecificAnswers ] = useState([]);
  const [ fillFields, setFillFields ] = useState({});
  // using useRef hook
  const editQn = useRef(null);
  const editAns = useRef(null);


  // get functions with useForm() hook
  const { register, handleSubmit, reset } = useForm();

  const { categoryId, id } = useParams();

  useEffect (() => {
    const getSpecificQuestion = async () => {
      try {
        const res = await API.get(`/questions/${id}`)
        const arr = res.data.data;
        setSpecificQuestion(arr);
        if (res.status === 200) {
          console.log(`Success retrieving Question ${id}`);
        }
      } catch (err) {
        console.log(`Error Getting Question ${id}`, err.message);
      }
    }
    getSpecificQuestion()
  }, [])
  
  useEffect (() => {
    const getSpecificAnswers = async () => {
      try {
        const res = await API.get(`/questions/${id}/answers`)
        const arr = res.data.data;
        setSpecificAnswers(arr);
        if (res.status === 200) {
          console.log(`Success retrieving Answers to Question ${id}`);
        }
      } catch (err) {
        console.log(`Error getting answers to Question ${id}`, err.message);
      }
    }
    getSpecificAnswers();
  }, []);

  useEffect(() => {
    // setTimeout(() => setFillFields({ 
    //   question : specificQuestion.question,
    //   category : specificQuestion.category,
    //   firstName: specificQuestion.firstName,
    //   lastName: specificQuestion.lastName,
    //   email: specificQuestion.email,
    // }), 800);
    function fillForm() {
      setFillFields({ 
        question : specificQuestion.question,
        category : specificQuestion.category,
        firstName: specificQuestion.firstName,
        lastName: specificQuestion.lastName,
        email: specificQuestion.email,
      })
    }
    fillForm()
  }, [specificQuestion])

  useEffect(() => {
    reset(fillFields);
  }, [])

  const history = useNavigate();
  console.log(specificAnswers)
  console.log(fillFields);
  return (
    <Container>
    <div className={classes.container}>
      <div className={classes["tags-section"]}>
        <div className={classes.category}>
          {specificQuestion.category}
        </div>
        <div className={classes.category}>
          Updated {timeSince(new Date(specificQuestion.updatedAt))} ago
        </div>
      </div>
      <div className={classes["name-section"]}>
        <div className={classes.name}>
          {specificQuestion.firstName} {specificQuestion.lastName} 📣
        </div>
        <div className={classes.meta}> 
          Asked on {new Date(specificQuestion.createdAt).toDateString()}
        </div>
      </div>
      <div className={classes.question}>
        {specificQuestion.question}
      </div>
      
      <div className={classes["edit-reply"]}>
        <div className={classes["edit-btn"]} onClick={() => slideToggle(editQn.current)}>Edit</div>
        <div className={classes["reply-btn"]}>Reply </div>
        <div className={classes["reply-counter"]}>
          { (specificAnswers.length > 0) && <div>{specificAnswers.length} answers</div> }
        </div>
      </div>
    </div>
   
    <div ref={editQn} className={classes["edit-container"]}>
      <div className={classes["edit-reply"]}>
        <div className={classes["edit-btn"]} onClick={() => slideToggle(editQn.current)}>Close</div>
      </div>
      <QuestionForm title="Edit Question" desc={`Hello ${specificQuestion.firstName}, You can update this question (ID:${specificQuestion.id}) anytime 😊`} fillFields={fillFields} setFillFields={setFillFields} key={id} />
    </div> 
    


    { ( specificAnswers.length == 0 ) ? <div className={classes.loading}>Oops . . . No answers for this question yet. Answer this question and earn reputation points! 🤗</div> : (
      specificAnswers.map((ans) => {
        return (
          <>
          <div className={classes["ans-container"]}>
            <div className={classes["tags-section"]}>
              <div className={classes.category}>
                {ans.category}
              </div>
              <div className={classes.category}>
                Updated {timeSince(new Date(ans.updatedAt))} ago
              </div>
            </div>
            <div key={ans.id} className={classes["name-section"]}>
              <p className={classes.name}>
                {ans.firstName} {ans.lastName}
              </p>
              <div className={classes.meta}> 
                Replied on {new Date(specificQuestion.createdAt).toDateString()}
              </div>
            </div>
            <div className={classes.question}>
              {ans.answer}
            </div>
            <div className={classes["edit-reply"]}>
              <div className={classes["edit-btn"]} onClick={() => slideToggle(editAns.current)}>Edit</div>
              <div className={classes["reply-btn"]}>Reply </div>
            </div>
          </div>

          </>
        ) 
      })
      )
    }

    <div ref={editAns} className={classes["edit-container"]}>
      <div className={classes["edit-reply"]}>
        <div className={classes["edit-btn"]} onClick={() => slideToggle(editAns.current)}>Close</div>
      </div>
      <QuestionForm title="Edit Question" desc={`Hello ${specificQuestion.firstName}, You can update this question (ID:${specificQuestion.id}) anytime 😊`} fillFields={fillFields} setFillFields={setFillFields} key={id} />
    </div> 

    </Container>
  );
};

export default SpecificQuestion;
