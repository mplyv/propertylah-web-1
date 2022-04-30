import { Link } from "react-router-dom"

//todo home screen
const PropertyHome = ()=>{
    return(
        <div>
            <Link to='/properties/rent'>Rent</Link>
            <br/>
            <Link to='/properties/sale'>Buy</Link>
        </div>
    )
}

export default PropertyHome