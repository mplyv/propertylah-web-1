import PropertyHome from "./PropertyHome";
import PropertyList from "./PropertyList";
import SpecificProperty from "./SpecificProperty";
import {
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";

const Properties = ()=>{
  const auth = useSelector((state) => state.auth);

  return(
    <Routes>
      <Route path='/' element={<PropertyHome />}/>
        <Route path='/rent' element={<PropertyList path='Rent'/>}/>
        <Route path='/rent/:id' element={<SpecificProperty />}/>
        <Route path='/sale' element={<PropertyList path='Sale'/>}/>
        {auth.isAuthenticated? <Route path='/agent/:sellerId' element={<PropertyList path='All'/>}/>: null}
        {auth.isAuthenticated? <Route path='/agent/:sellerId/:id' element={<SpecificProperty />}/>: null}
    </Routes>
  )
}

export default Properties;

