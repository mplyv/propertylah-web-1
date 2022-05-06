import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import classes from "./SpecificQuestions.module.css";
import API from "./API";

import Container from "../UI/Container";
import QuestionForm from "./QuestionForm";
import { slideToggle } from "../UI/SlideToggle";
import { timeSince } from "../UI/TimeSince";

//delete before push
import AnswerForm from "./AnswerForm/AnswerForm";

const SpecificQuestion = () => {
  const [ specificQuestion, setSpecificQuestion ] = useState([]);
  const [ specificAnswers, setSpecificAnswers ] = useState([]);
  const [ fillQnFields, setFillQnFields ] = useState({});
  const [ fillAnsFields, setFillAnsFields ] = useState({});
  const [ show, setShow ] = useState(false);
  const [ selected, setSelected ] = useState(null);
  // using useRef hook
  const editQn = useRef(null);
  const ansQn = useRef(null);

  // toggle edit btn in specific ans
  const toggleEdit = (i) => {
    setSelected(i);
    setShow(!show);
  }

  // toggle edit btn in specific ans
  const toggleReplyQn = (i) => {
    setSelected(i);
    setShow(!show);
  }

  // get functions with useForm() hook
  const { register, handleSubmit, reset } = useForm();

  const { categoryId, id } = useParams();

  // useEffect (() => {
  //   const getSpecificQuestion = async () => {
  //     try {
  //       const res = await API.get(`/questions/${id}`)
  //       const arr = res.data.data;
  //       setSpecificQuestion(arr);
  //       if (res.status === 200) {
  //         console.log(`Success retrieving Question ${id}`);
  //       }
  //     } catch (err) {
  //       console.log(`Error Getting Question ${id}`, err.message);
  //     }
  //   }
  //   getSpecificQuestion()
  // }, [])

  const getSpecificQuestion = useCallback( async () => {
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
  }, []);

  useEffect(() => {
    getSpecificQuestion();
    setShow(!show);
  }, [getSpecificQuestion]);


  const getSpecificAnswers = useCallback( async () => {
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
  }, []);

  useEffect(() => {
    getSpecificAnswers();
    setShow(!show);
  }, [getSpecificAnswers]);
  

  useEffect(() => {
    // setTimeout(() => setFillQnFields({ 
    //   question : specificQuestion.question,
    //   category : specificQuestion.category,
    //   firstName: specificQuestion.firstName,
    //   lastName: specificQuestion.lastName,
    //   email: specificQuestion.email,
    // }), 800);
    function fillQnForm() {
      setFillQnFields({ 
        question : specificQuestion.question,
        category : specificQuestion.category,
        firstName: specificQuestion.firstName,
        lastName: specificQuestion.lastName,
        email: specificQuestion.email,
      })
    }
    fillQnForm()
  }, [specificQuestion])

  useEffect(() => {
    reset(fillQnFields);
  }, [])

  useEffect(() => {
    function fillAnsForm() {
      setFillAnsFields({ 
        answer : specificAnswers.answer,
        category : specificAnswers.category,
        firstName: specificAnswers.firstName,
        lastName: specificAnswers.lastName,
        email: specificAnswers.email,
      })
    }
    fillAnsForm()
  }, [specificAnswers])

  useEffect(() => {
    reset(fillAnsFields);
  }, [])

  const history = useNavigate();
  console.log(specificAnswers)
  console.log(fillQnFields);
  console.log(fillAnsFields);
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
        <div className={classes["trend-category"]}>
          { specificAnswers.length >= 5 && ( <div>Trending</div> ) }
          { specificAnswers.length >= 1 && specificAnswers.length < 5 && ( <div>Popular</div> ) }
          { !specificAnswers.length && ( <div>Needs help</div> ) }
        </div>
        <div className={classes["questionId-section"]}>
          <div className={classes.questionId}>
            Question #{specificQuestion.id}
          </div>
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
        <div className={classes["reply-btn"]} onClick={() => slideToggle(ansQn.current)}>Reply </div>
        <div className={classes["reply-counter"]}>
          { (specificAnswers.length > 0) && <div>{specificAnswers.length} answers</div> }
        </div>
      </div>
    </div>

    { editQn &&
      (
        <div ref={editQn} className={classes["edit-qn-container"]}>
          <div className={classes["edit-reply"]}>
            <div className={classes["edit-btn"]} onClick={() => slideToggle(editQn.current)}>Close</div>
          </div>
          <QuestionForm title="Edit Question" desc={`Hello ${specificQuestion.firstName}, You can update this question (ID:${specificQuestion.id}) anytime 😊`} fillQnFields={fillQnFields} setFillQnFields={setFillQnFields} key={id} getSpecificQuestion={getSpecificQuestion} />
        </div> 
      )
    }

    { ansQn && 
      (
        <div ref={ansQn} className={classes["edit-qn-container"]}>
          <div className={classes["edit-reply"]}>
            <div className={classes["edit-btn"]} onClick={() => slideToggle(ansQn.current)}>Close</div>
          </div>
          <AnswerForm title={`Reply to ${specificQuestion.firstName}`} key={id} />
        </div> 
      )
    }

    { ( specificAnswers.length > 0 ) ? 
      specificAnswers.map((ans, i) => {
        return (
          <div key={i}>
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
              <div className={classes["edit-btn"]} onClick={() => [toggleEdit(i), setShow(!show)]}>Edit</div>
              <div className={classes["reply-btn"]}>Reply </div>
            </div>
          </div>

          { selected === i && !show ? 
            <div className={classes["ans-container"]}>
            <div className={classes["edit-reply"]}>
              <div className={classes["edit-btn"]} onClick={() => setShow(!show)}>Close</div>
            </div>
            <AnswerForm title={`Editing ${ans.firstName}'s answer`} fillAnsFields={fillAnsFields} setFillAnsFields={setFillAnsFields} key={id} specificAnswers={specificAnswers} getSpecificAnswers={getSpecificAnswers} />
            </div> 
          : null
          }
          </div>
        ) 
      }) : (
        <>
        <div className={classes.loading}>Oops . . . No answers for this question yet. Answer this question and earn reputation points! 🤗</div>
        <div className={classes["no-answers"]}> 
          <button className={classes["cta-btn"]}>Answer now</button>
        </div>
        </>
      )
    }

    {/* <div ref={editAns} className={classes["edit-container"]}>
      <div className={classes["edit-reply"]}>
        <div className={classes["edit-btn"]} onClick={() => slideToggle(editAns.current)}>Close</div>
      </div>
      <QuestionForm title="Edit Question" desc={`Hello ${specificQuestion.firstName}, You can update this question (ID:${specificQuestion.id}) anytime 😊`} fillQnFields={fillQnFields} setFillQnFields={setFillQnFields} key={id} />
    </div>  */}
    {/* <AnswerForm title="Answer Question" desc={`Hello ${specificQuestion.firstName}, You can update this answer (ID:${specificQuestion.id}) anytime 😊`} fillAnsFields={fillAnsFields} setFillAnsFields={setFillAnsFields} key={id} /> */}
    </Container>
  );
};

export default SpecificQuestion;
