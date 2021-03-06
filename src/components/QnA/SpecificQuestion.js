import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import classes from "./SpecificQuestions.module.css";
import heroClasses from "./HeroSection.module.css";
import { Avatar } from "@mui/material";
import API from "./API";

import Container from "../UI/Container";
import QuestionForm from "./QuestionForm";
import UserQuestions from "./UserQuestions";
import AnsModal from "./AnsModal";
import Vote from "../UI/Vote";
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
  const [ showEditAns, setShowEditAns ] = useState(false);
  const [ showReplyAns, setShowReplyAns ] = useState(false);
  const [ selected, setSelected ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);
  const [ type, setType ] = useState(true);

  const [ user, setUser ] = useState("");
  const [ userQuestions, setUserQuestions ] = useState([]);

  // using useRef hook
  const editQn = useRef(null);
  const ansQn = useRef(null);
  const delQn = useRef(null);

  // get functions with useForm() hook
  const { register, handleSubmit, reset } = useForm();

  const { categoryId, id } = useParams();
  const auth = useSelector((state) => state.auth);


  // toggle edit btn in specific ans
  const toggleEditAns = (i) => {
    setSelected(i);
    setShowEditAns(!showEditAns);
  }

  // toggle reply btn in specific ans
  const toggleReplyAns = (i) => {
    setSelected(i);
    setShowReplyAns(!showReplyAns);
  }

  // get number of questions this user has asked
  useEffect(() => {
    async function getUserQuestions() {
      setUser(specificQuestion.firstName);
      const res = await API.get(`/questions/?firstName[eq]=${user}`)
      const arr = res.data.data;
      setUserQuestions(arr);
    }
    getUserQuestions();
  }, [specificQuestion]);


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


  const getSpecificAnswers = React.useCallback( async () => {
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
    const fillAnsForm = () => {
      specificAnswers.map((ans, i) => {
        setFillAnsFields({ 
          id : ans.id,
          answer : ans.answer,
          category : ans.category,
          firstName: ans.firstName,
          lastName: ans.lastName,
          email: ans.email,
        })
      })
    }
    fillAnsForm()
  }, [specificAnswers])

  
  useEffect(() => {
    reset(fillAnsFields);
  }, [])

  console.log(specificAnswers)
  console.log(fillQnFields);
  console.log(fillAnsFields);

  const openModal = () => {
    setShowModal(true);
  };

  const handleDelete = async (e) => {
    try {
      const res = await API.delete(`/questions/${specificQuestion.id}`)
      if ( res ) {
        console.log(`You have deleted answer ${specificQuestion.id}.`)
      } else {
        throw new Error("Oops, something went wrong. Please try again.")
      }
      return;
    } catch (err) {
      console.log("DELETE error", err.message);
    }
  }

  return (
    <>
    <article className={heroClasses["specific-hero-container"]}>
      <div className={heroClasses["hero-inner"]}>
        <div className={heroClasses["category-p"]}>Here's </div>
        <div className={heroClasses["category-h2"]}>{ specificQuestion.firstName} {specificQuestion.lastName}'s question</div>

        <div className={classes["tags-section"]}>
        <Link to={`/qna/questions/${specificQuestion.firstName}`}>
        <div className={classes["trend-category"]}>
          Asked {userQuestions.length} <div> &nbsp;questions </div>
          &nbsp;so far
        </div>
        </Link>
        <Link to={`/qna/${categoryId.split(" ").join("")}`}>
        <div className={classes["trend-category"]}>
          { categoryId.replace(/([A-Z]+)/g, ' $1').trim() }
        </div>  
        </Link>          
        </div>
      </div>
    </article>

    <div className={classes.container}>
    <div className={classes["main-container"]}>
      <div className={classes["tags-section"]}>
        <Link to={`/qna/${categoryId}`}>
        <div className={classes.category}>
          {specificQuestion.category}
        </div>
        </Link>
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
          {specificQuestion.firstName} {specificQuestion.lastName} ????
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
        { auth.firstName === specificQuestion.firstName ? <div className={classes["reply-btn"]} onClick={() => slideToggle(delQn.current)}>Delete </div> : null }
        <div className={classes["reply-counter"]}>
          { (specificAnswers.length > 0) && <div>{specificAnswers.length} answers</div> }
        </div>
      </div>
    </div>

    { editQn && auth.isAuthenticated ?
      ( auth.firstName === specificQuestion.firstName ?
        <div ref={editQn} className={classes["edit-qn-container"]}>
          <div className={classes["edit-reply"]}>
            <div className={classes["edit-btn"]} onClick={() => slideToggle(editQn.current)}>Close</div>
          </div>
          <QuestionForm title="Edit Question" desc={`Hello ${specificQuestion.firstName}, You can update this question (ID:${specificQuestion.id}) anytime ????`} fillQnFields={fillQnFields} setFillQnFields={setFillQnFields} key={id} getSpecificQuestion={getSpecificQuestion} />
        </div> :

        <div ref={editQn} className={classes["edit-qn-container"]}>
        <div className={classes["edit-reply"]}>
          <div className={classes["edit-btn"]} onClick={() => slideToggle(ansQn.current)}>Close</div>
        </div>
        <div className={classes["edit-reply"]}>Sorry, you can't edit someone else's question.</div>
        </div>
      ) : 
      
      <div ref={editQn} className={classes["edit-qn-container"]}>
        <div className={classes["edit-reply"]}>
          <div className={classes["edit-btn"]} onClick={() => slideToggle(ansQn.current)}>Close</div>
        </div>
        <div className={classes["edit-reply"]}>You must be logged in to edit your question.</div>
      </div>
    }

    { ansQn &&
      ( auth.isAuthenticated ?
        <div ref={ansQn} className={classes["edit-qn-container"]}>
          <div className={classes["edit-reply"]}>
            <div className={classes["edit-btn"]} onClick={() => slideToggle(ansQn.current)}>Close</div>
          </div>
          <AnswerForm title={`Reply to ${specificQuestion.firstName}`} key={id} getSpecificAnswers={getSpecificAnswers} />
        </div> : 

        <div ref={ansQn} className={classes["edit-qn-container"]}>
        <div className={classes["edit-reply"]}>
          <div className={classes["edit-btn"]} onClick={() => slideToggle(ansQn.current)}>Close</div>
        </div>
        <div className={classes["edit-reply"]}>You must be logged in to post an answer.</div>
        </div>
      ) 
    }

    { delQn && auth.firstName === specificQuestion.firstName ? 
      <div ref={delQn} className={classes["edit-qn-container"]}>
      <div className={classes["edit-reply"]}>Are you sure you want to delete this question?</div>
      <div className={classes["edit-reply"]}>
        <Link to={`/qna/${categoryId.split(" ").join("")}`}>
        <div className={classes["edit-btn"]} onClick={handleDelete}>Yes</div>
        </Link>
        <div className={classes["edit-btn"]} onClick={() => slideToggle(delQn.current)}>No</div>
      </div>
      </div>
      : null            
    }

    { ( specificAnswers.length > 0 ) ? 
      specificAnswers.map((ans, i) => {
        return (
          <div key={i}>
          <div className={classes["ans-container"]}>
            <Vote />
            <div className={classes["content-container"]}>
            <div className={classes["tags-section"]}>
              <Link to={`/qna/${categoryId}`}>
              <div className={classes.category}>
                {ans.category}
              </div>
              </Link>
              <div className={classes.category}>
                Updated {timeSince(new Date(ans.updatedAt))} ago
              </div>
              <div className={classes["questionId-section"]}>
                <div className={classes.questionId}>
                  Answer #{ans.id}
                </div>
              </div>
            </div>
            <div key={ans.id} className={classes["name-section"]}>
              <p className={classes.name}>
                {ans.firstName} {ans.lastName}
              </p>
              <div className={classes.meta}> 
                Replied on {new Date(ans.createdAt).toDateString()}
              </div>
            </div>
            <div className={classes.question}>
              {ans.answer}
            </div>
            <div className={classes["edit-reply"]}>
              <div className={classes["edit-btn"]} onClick={() => [toggleEditAns(i), setShowEditAns(!showEditAns)]}>Edit</div>
              <div className={classes["reply-btn"]} onClick={() => [toggleReplyAns(i), setShowReplyAns(!showReplyAns)]}>Reply </div>
            </div>
            </div>
          </div>

          { selected === i && showEditAns ? 
            <div className={classes["content-container"]}>
            <div className={classes["edit-reply"]}>
              <div className={classes["edit-btn"]} onClick={() => setShowEditAns(!showEditAns)}>Close</div>
            </div>
            <AnswerForm title={`Editing ${ans.firstName}'s answer (#${ans.id})`} fillAnsFields={fillAnsFields} setFillAnsFields={setFillAnsFields} key={id} specificAnswers={specificAnswers} getSpecificAnswers={getSpecificAnswers} />
            </div> 
            : null
          }

          
          { selected === i && showReplyAns ?
            ( auth.isAuthenticated ? 
              <div className={classes["content-container"]}>
              <div className={classes["edit-reply"]}>
                <div className={classes["edit-btn"]} onClick={() => setShowReplyAns(!showReplyAns)}>Close</div>
              </div>
              <AnswerForm title={`Replying to ${ans.firstName}'s answer`} key={id} specificAnswers={specificAnswers} getSpecificAnswers={getSpecificAnswers} />
              </div> 
              : 
              <div className={classes["content-container"]}>
              <div className={classes["edit-reply"]}>
                <div className={classes["edit-btn"]} onClick={() => setShowReplyAns(!showReplyAns)}>Close</div>
              </div>
              <div>You must be logged in to post an answer.</div>
              </div>
            ) : null
          }

          </div>
        )
      }).slice().sort((a, b) => a.updatedAt > b.updatedAt ? 1 : -1 )
      
      : (
        <>
        <div className={classes.loading}>Oops . . . No answers for this question yet. Answer this question and earn reputation points! ????</div>
        <div className={classes["no-answers"]}> 
          <button className={classes["cta-btn"]} onClick={openModal} type={type} setType={setType}>Answer now</button>
        </div>
        { showModal ? <AnsModal setShowModal={setShowModal} /> : null }
        </>
      )
    }
    </div>
    </>
  );
};

export default SpecificQuestion;
