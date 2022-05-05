import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import classes from "./SpecificQuestions.module.css";

import API from "./API";
import Container from "../UI/Container";
import QuestionForm from "./QuestionForm";

const SpecificQuestion = () => {
  const [ specificQuestion, setSpecificQuestion ] = useState([]);
  const [ fillFields, setFillFields ] = useState({});

  // get functions with useForm() hook
  const { register, handleSubmit, reset } = useForm();

  const { categoryId, id } = useParams();
  console.log(categoryId)
  console.log(id)

  useEffect (() => {
    async function getSpecificQuestion() {
      const res = await API.get(`/questions/${id}`)
      const arr = res.data.data;
      setSpecificQuestion(arr);
    }
    getSpecificQuestion()
      .then((res) => {
        if (res.status === 200) {
          console.log(`Success retrieving Question ${id}`);
        }
      })
      .catch((err) => {
        console.log(`Error Getting Question ${id}`, err.message)
      })

  }, [])

  useEffect(() => {
    // setTimeout(() => setFillFields({ 
    //   question : specificQuestion.question,
    //   category : specificQuestion.category,
    //   firstName: specificQuestion.firstName,
    //   lastName: specificQuestion.lastName,
    //   email: specificQuestion.email,
    // }), 800);
    async function fillForm() {
      await setFillFields({ 
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
  }, [fillFields])


  const history = useNavigate();

  console.log(fillFields);
  return (
    <Container>
    <div className={classes.container}>
      <div className={classes["name-section"]}>
      <div className={classes.category}>
        {specificQuestion.category}
      </div>
      <div className={classes.name}>
        {specificQuestion.firstName} {specificQuestion.lastName} 📣
      </div>
      <div className={classes.meta}> 
        asked on {new Date(specificQuestion.createdAt).toDateString()}
      </div>
      </div>
        <div className={classes.question}>
      {specificQuestion.question}
      </div>
      
      <div className={classes["edit-reply"]}>
        <div>Edit </div>
        <div>Reply </div>
      </div>
    </div>
    <div className={classes.container}>
      <QuestionForm title="Edit Question" desc={`Hello ${specificQuestion.firstName}, You can update this question (ID:${specificQuestion.id}) anytime 😊`} fillFields={fillFields} setFillFields={setFillFields} key={id} />
    </div>
      
    </Container>
  );
};

export default SpecificQuestion;
