import React,{useState} from 'react'
import TextArea from '../../UI/TextArea'
import FormInput from '../../UI/FormInput'
import API from '../API'
import { useParams } from "react-router-dom";
import './AnswerFormModul.css'
import Dropdown from "../../UI/Dropdown";


const AnswerForm = (props) => {
    const fillAnsFields = props.fillAnsFields;
    const getSpecificAnswers = props.getSpecificAnswers;

    const [values, setValues] = useState({
        answer: (fillAnsFields ? fillAnsFields.answer : ""),
        category: (fillAnsFields ? fillAnsFields.category : ""),
        firstName: (fillAnsFields ? fillAnsFields.firstName : ""),
        lastName: (fillAnsFields ? fillAnsFields.lastName : ""),
        email: (fillAnsFields ? fillAnsFields.email : ""),
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
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onDropdownChange = e => {
        setValues({ ...values , [e.target.name] : stripEmojis(e.target.value) })
    }
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        setValues({ ...values , [e.target.name] : e.target.value })
        console.log(fillAnsFields.id)
        try {
            let mounted = true;
            const res = await API.patch(`/answers/${fillAnsFields.id}`, {
              "id" : fillAnsFields.id,
              "answer" : values.answer,
              "category" : values.category,
              "firstName" : values.firstName,
              "lastName" : values.lastName,
              "email" : values.email
            })
            if ( res.status === 200 ) {
              getSpecificAnswers();
              console.log(`You have updated an answer: ${JSON.stringify(res)}`)
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
        setValues({ ...values, [e.target.name]: e.target.value })
        try {
            let mounted = true;
            const res = await API.post(`/answers/`, {
                "answer" : values.answer,
                "category" : values.category,
                "firstName" : values.firstName,
                "lastName" : values.lastName,
                "email" : values.email,
                "questionId" : id
            })
            
            if (res.status === 200) {
                // getSpecificAnswers();
                console.log(`You have posted an answer: ${JSON.stringify(res.data)}`)
            } else {
                throw new Error("Oops, something went wrong. Please try again.");
            }
            return () => mounted = false;
        } catch (err) {
            console.log("POST error", err.message);
        }
    }
    
    return (
        <div>
            <div className="form-intro">
            <h1>{ fillAnsFields ? props.title : props.title }</h1>
            </div>
        { fillAnsFields ? (

            <form onSubmit={handleUpdate} key={values.id}>
            <TextArea 
              label="What's your answer?" 
              name="answer" 
              value={values.answer} 
              type="text"
              onChange={onChangeUpdate} 
              errorMessage="Please provide a valid answer." 
              required={true}
              defaultValue={fillAnsFields.answer}
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
              defaultValue={fillAnsFields.category}
            />
            <FormInput 
              label="First Name" 
              name="firstName" 
              value={values.firstName} 
              type="text"
              onChange={onChangeUpdate} 
              errorMessage="Please enter your first name."
              required={true}
              defaultValue={fillAnsFields.firstName}
            />
            <FormInput 
              label="Last Name" 
              name="lastName" 
              value={values.lastName} 
              type="text"
              onChange={onChangeUpdate} 
              errorMessage="Please enter your last name." 
              required={true}
              defaultValue={fillAnsFields.lastName}
            />
            <FormInput 
              label="Email" 
              name="email" 
              value={values.email} 
              type="email"
              onChange={onChangeUpdate} 
              errorMessage="Please provide a valid email address." 
              required={true}
              defaultValue={fillAnsFields.email}
            />
            <button className="submit-btn">Update Answer</button>
            </form>
        ) : (

            <form onSubmit={handleSubmit}>
            <TextArea 
              label="What's your answer?" 
              name="answer" 
              placeholder="Try to post constructive suggestions, and be as helpful as possible! 🙂" 
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


        )}
    </div>
  )
}

export default AnswerForm