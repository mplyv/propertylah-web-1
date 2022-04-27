import PropertyHome from "./PropertyHome";
import PropertyList from "./PropertyList";
import {
  Routes,
  Route,
  Link,
} from "react-router-dom";

const Properties = ()=>{
  return(
    <Routes>
      <Route path='/' element={<PropertyHome />}/>
        <Route path='/rent' element={<PropertyList path='Rent'/>}/>
        <Route path='/sale' element={<PropertyList path='Sale'/>}/>
    </Routes>
  )
}

export default Properties;

