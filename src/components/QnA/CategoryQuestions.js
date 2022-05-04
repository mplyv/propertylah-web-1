import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../../index.css";
import classes from "./CategoryQuestions.module.css";
import { getQuestions } from "./API"
import API from "./API";

import Container from "../UI/Container";
import Card from "../UI/Card";

const CategoryQuestions = (props) => {
  const [ loading, setLoading ] = useState(false);
  const [ categoryQuestions, setCategoryQuestions ] = useState([]);

  const { categoryId } = useParams();

  // format categoryId in params
  const categoryIdMatch = categoryId.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ')

  useEffect (() => {
    async function getCategoryQuestions() {
      setLoading(true);
      const res = await API.get(`/questions/?category[eq]=${categoryIdMatch}`)
      // const res = await API.get(`/questions`, {
      //   params : {
      //     [category[eq]]: categoryId
      //   }
      // })
      const arr = res.data.data
      setCategoryQuestions(arr);
      setLoading(false)
    }
    getCategoryQuestions()
  }, []);

  console.log(categoryQuestions)

  // time function
  function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  // var aDay = 24*60*60*1000;
  // console.log(timeSince(new Date(Date.now()-aDay)));
  // console.log(timeSince(new Date(Date.now()-aDay*2)));
  return (
    <Container>
      <Card><h1>Hello { categoryId }</h1></Card>

      { loading ? <div className={classes.loading}>Loading . . .</div> : (
        categoryQuestions.map((qn) => {
          return (
          <Link to={`/qna/${categoryId}/${qn.id}`} key={qn.id}>
          <div className={classes.container}>
            <div key={qn.id} className={classes["name-section"]}>
              <p className={classes.name}>
                {qn.firstName} {qn.lastName}
              </p>
              <div className={classes.category}>
                {qn.category}
              </div>
            </div>
            <div className={classes.meta}>
              <p>Updated {timeSince(new Date(qn.updatedAt))} ago •&nbsp;</p>
              <p>Asked {timeSince(new Date(qn.createdAt))} ago on {new Date(qn.createdAt).toDateString()}</p>
            </div>
            <div className={classes.question}>
              {qn.question}
            </div>
          </div>
          </Link>
          
        )}).slice().sort((a, b) => b.updatedAt > a.updatedAt ? 1 : -1)
      )}
      
      <Card><h1>Hello { categoryId }</h1></Card>
      <button>Hello</button>
      {/* <div>
        <h1>{categoryId}</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          pellentesque nec purus id imperdiet. Nunc eu varius velit. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. In luctus, mauris a porta
          porttitor, purus mauris aliquam sapien, et auctor ante urna at magna.
          Aenean et interdum ligula, nec lacinia lectus. Cras et massa in diam
          finibus condimentum. Nam scelerisque bibendum ipsum, eget finibus
          sapien. Nunc porttitor nibh lorem, quis ultrices risus viverra quis.
          Donec lacinia elementum velit sed sagittis. Pellentesque sed enim
          dignissim, euismod sapien quis, lobortis purus. Vivamus pellentesque
          posuere urna, ac molestie lacus luctus sed. Praesent orci dolor,
          sagittis consequat congue ut, auctor eget leo. Sed felis nunc,
          tincidunt eu feugiat non, scelerisque non nulla. Sed interdum libero
          non ante volutpat fringilla. Donec rhoncus lorem eget neque iaculis,
          vitae finibus purus posuere. Ut scelerisque, orci eget ultricies
          auctor, leo augue condimentum leo, quis pretium lectus augue ut justo.
          Nullam lacinia iaculis magna a volutpat.
        </p>
        <p>
          Morbi et nisl ut dolor fringilla ornare a vel felis. Maecenas
          vestibulum ornare tristique. Nunc quis auctor sem. Cras finibus, mi
          sit amet lacinia venenatis, ipsum nibh fermentum leo, at congue metus
          ligula non nisi. Vestibulum imperdiet sapien ac consectetur laoreet.
          In mollis enim quis arcu varius, vitae tincidunt turpis elementum.
          Vestibulum sagittis nisi augue, sed blandit quam porttitor ac. Etiam
          sit amet congue elit. Aliquam erat volutpat. Suspendisse hendrerit
          orci vel neque porta, quis sagittis enim accumsan.
        </p>

        <p>
          Ut molestie elit ut arcu mollis consectetur. Duis aliquet tellus sed
          bibendum semper. Integer dignissim sed dolor vitae rhoncus. Nam varius
          bibendum arcu. Nunc ornare enim at porttitor cursus. Duis felis nisl,
          facilisis sit amet ipsum quis, sollicitudin scelerisque nibh. Proin
          bibendum fringilla condimentum. In bibendum arcu ligula. Ut id
          vulputate felis, consectetur pharetra metus. Proin id metus porttitor,
          venenatis arcu ac, venenatis leo. In hac habitasse platea dictumst.
        </p>
      </div> */}
    </Container>
    
  )
  
}

export default CategoryQuestions;