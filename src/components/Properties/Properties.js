import PropertyHome from "./PropertyHome";
import PropertyList from "./PropertyList";
import SpecificProperty from "./SpecificProperty";
import {
  Routes,
  Route,
} from "react-router-dom";

// todo add authctx here and protect agent route

const Properties = ()=>{
  return(
    <Routes>
      <Route path='/' element={<PropertyHome />}/>
        <Route path='/rent' element={<PropertyList path='Rent'/>}/>
        <Route path='/rent/:id' element={<SpecificProperty />}/>
        <Route path='/sale' element={<PropertyList path='Sale'/>}/>
        <Route path='/agent/:sellerId' element={<PropertyList path='All'/>}/>
        <Route path='/agent/:sellerId/:id' element={<SpecificProperty />}/>
    </Routes>
  )
}

export default Properties;

