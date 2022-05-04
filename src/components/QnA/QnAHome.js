import { useState, useEffect } from "react";
import "../../index.css";
import { getQuestions, getCategoryQuestions } from "./API"

import Container from "../UI/Container";
import Card from "../UI/Card";
import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import CategoryQuestions from "./CategoryQuestions";

const QnAHome = () => {
  const [ totalQuestions, setTotalQuestions ] = useState([]);
  const [ questions, setQuestions ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);


  return (
    <>
    <HeroSection 
      totalQuestions={totalQuestions} 
      setTotalQuestions={setTotalQuestions} 
      loading={loading}
      setLoading={setLoading}
      showModal={showModal}
      setShowModal={setShowModal}
    />
    <CategorySection 
      questions={questions} 
      setQuestions={setQuestions}       
      totalQuestions={totalQuestions} 
    />
    {/* <Container>
      <Card><h1>Hello</h1></Card>
      <button>Hello</button>
      <div>
        <h1>Q & A</h1>
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
      </div>
    </Container> */}
    </>
  );
};

export default QnAHome;
