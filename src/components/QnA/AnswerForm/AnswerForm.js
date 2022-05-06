import React,{useState} from 'react'
import TextArea from '../../UI/TextArea'
import FormInput from '../../UI/FormInput'
import API from '../API'
import { useParams } from "react-router-dom";
import './AnswerFormModul.css'
import Dropdown from "../../UI/Dropdown";


const AnswerForm = (props) => {
    const fillFields = props.fillFields;

    const [values, setValues] = useState({
        answer: (fillFields ? fillFields.answer : ""),
        category: (fillFields ? fillFields.category : ""),
        firstName: (fillFields ? fillFields.firstName : ""),
        lastName: (fillFields ? fillFields.lastName : ""),
        email: (fillFields ? fillFields.email : ""),
        questionId: (fillFields ? fillFields.questionId : "")
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
    
    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onDropdownChange = e => {
    setValues({ ...values , [e.target.name] : stripEmojis(e.target.value) })
    }
    
    const handleSubmit = async (e) => {
       
        setValues({ ...values, [e.target.name]: e.target.value })
            try {
                let mounted = true;
                const res = await API.post(`/answers/`, {
                    "answer": values.answer,
                    "category": values.category,
                    "firstName": values.firstName,
                    "lastName": values.lastName,
                    "email": values.email,
                    "questionId": id
                })

                if (res.status === 200) {
                    console.log(`You have posted an answer: ${JSON.stringify(res.data)}`)
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
          <h1>{ fillFields ? props.title : `Reply to this Question` }</h1>
        </div>
          <form onSubmit={handleSubmit} key={values.id}>
          <TextArea 
            label="What's your answer?" 
            name="answer" 
            placeholder="Start with 'How', 'What', 'Where', 'Why', etc" 
            value={values.answer} 
            type="text"
            onChange={onChange} 
            errorMessage="Please provide a valid answer." 
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
          <button className="submit-btn">Submit Answer</button>
        </form>
        
        


    </div>
  )
}

export default AnswerForm