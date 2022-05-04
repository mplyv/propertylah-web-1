import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import FormInput from "../../UI/FormInput";
import TextArea from "../../UI/TextArea";
import Dropdown from "../../UI/Dropdown";
import API from "../API";

const QuestionForm = (props) => {
  const fillFields = props.fillFields;
  // console.log(fillFields)

  const [ values, setValues ] = useState({
    question : (fillFields ? fillFields.question : ""),
    category : (fillFields ? fillFields.category : ""),
    firstName: (fillFields ? fillFields.firstName : ""),
    lastName: (fillFields ? fillFields.lastName : ""),
    email: (fillFields ? fillFields.email : ""),
  });

  const { id } = useParams();

  const categoryOptions = {
    "🏢 Condo Questions" : "Condo Questions", 
    "👪 Home Buying" : "Home Buying", 
    "🏬 HDB" : "HDB", 
    "🛬 Renting" : "Renting",
    "💬 General" : "General", 
    "💰 Home Selling" : "Home Selling", 
    "💲 Home Financing" : "Home Financing", 
    "🧓 Property Agents" : "Property Agents",
    "💡 HDB Tips" : "HDB Tips"
  }

  const stripEmojis = (str) =>
  str
    .replace(
      /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, ' '
    )
    .replace(/\s+/g, ' ')
    .trim();
  
  const onChangeUpdate = e => {
    setValues({ ...values , [e.target.name] : e.target.value })
  }

  const onDropdownChangeUpdate = e => {
    setValues({ ...values , [e.target.name] : stripEmojis(e.target.value) })
  }
  
  const onChange = e => {
    setValues({ ...values , [e.target.name] : e.target.value })
  }

  const onDropdownChange = e => {
    setValues({ ...values , [e.target.name] : stripEmojis(e.target.value) })
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setValues({ ...values , [e.target.name] : e.target.value })

    try {
      let mounted = true;
      const res = await API.patch(`/questions/${id}`, {
        "id" : parseInt(id),
        "question" : values.question,
        "category" : values.category,
        "firstName" : values.firstName,
        "lastName" : values.lastName,
        "email" : values.email
      })
      if ( res.status === 200 ) {
        console.log(`You have updated a question: ${JSON.stringify(res)}`)
      } else {
        throw new Error("Oops, something went wrong. Please try again.");
      }
      return () => mounted = false;
    } catch (err) {
      console.log("PATCH error", err.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values , [e.target.name] : e.target.value })
    
    try {
      let mounted = true;
      const res = await API.post(`/questions/`, {
        "question" : values.question,
        "category" : values.category,
        "firstName" : values.firstName,
        "lastName" : values.lastName,
        "email" : values.email
      })

      if ( res.status === 200 ) {
        console.log(`You have posted a question: ${JSON.stringify(res.data)}`)
      } else {
        throw new Error("Oops, something went wrong. Please try again.");
      }
      return () => mounted = false;
    } catch (err) {
      console.log("POST error", err.message);
    }
  }

  console.log(values);

  return (
    <div>
        <div className="form-intro">
          <h1>{ fillFields ? props.title : `Ask Your Question` }</h1>
          <p>{ fillFields ? props.desc : `Our PropertyLah experts will answer within 24 hours.` }</p>
        </div>
        { fillFields ? (
          
          <form onSubmit={handleUpdate}>
          <TextArea 
          label="What's your question?" 
          name="question" 
          value={values.question} 
          type="text"
          onChange={onChangeUpdate} 
          errorMessage="Please provide a valid question." 
          required={true}
          defaultValue={fillFields.question}
          />
          <Dropdown 
          label="Category"
          name="category"
          placeholder="Select category"
          value={values.category}
          onChange={onDropdownChangeUpdate}
          errorMessage="Please select a suitable category for your question"
          required={true}
          options={Object.keys(categoryOptions)}
          defaultValue={fillFields.category}
          />
          <FormInput 
          label="First Name" 
          name="firstName" 
          value={values.firstName} 
          type="text"
          onChange={onChangeUpdate} 
          errorMessage="Please enter your first name."
          required={true}
          defaultValue={fillFields.firstName}
          />
          <FormInput 
          label="Last Name" 
          name="lastName" 
          value={values.lastName} 
          type="text"
          onChange={onChangeUpdate} 
          errorMessage="Please enter your last name." 
          required={true}
          defaultValue={fillFields.lastName}
          />
          <FormInput 
          label="Email" 
          name="email" 
          value={values.email} 
          type="email"
          onChange={onChangeUpdate} 
          errorMessage="Please provide a valid email address." 
          required={true}
          defaultValue={fillFields.email}
          />
          <button className="submit-btn">Update Question</button>
          </form>
          
        ) : (
        
          <form onSubmit={handleSubmit} key={values.id}>
          <TextArea 
            label="What's your question?" 
            name="question" 
            placeholder="Start with 'How', 'What', 'Where', 'Why', etc" 
            value={values.question} 
            type="text"
            onChange={onChange} 
            errorMessage="Please provide a valid question." 
            required={true}
          />
          
          <Dropdown 
            label="Category"
            name="category"
            placeholder="Select category"
            value={values.category}
            onChange={onDropdownChange}
            errorMessage="Please select a suitable category for your question"
            required={true}
            options={Object.keys(categoryOptions)}
          />
          <FormInput 
            label="First Name" 
            name="firstName" 
            placeholder="First Name" 
            value={values.firstName} 
            type="text"
            onChange={onChange} 
            errorMessage="Please enter your first name."
            required={true}
          />
          <FormInput 
            label="Last Name" 
            name="lastName" 
            placeholder="Last Name" 
            value={values.lastName} 
            type="text"
            onChange={onChange} 
            errorMessage="Please enter your last name." 
            required={true}
          />
          <FormInput 
            label="Email" 
            name="email" 
            placeholder="tim@apple.com" 
            value={values.email} 
            type="email"
            onChange={onChange} 
            errorMessage="Please provide a valid email address." 
            required={true}
          />
          <button className="submit-btn">Submit Question</button>
        </form>
        
        )}
        
      
    </div>
  )
}

export default QuestionForm;