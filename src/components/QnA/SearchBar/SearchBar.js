import React,{useState, useEffect} from 'react'
import classes from "./SearchBar.module.css"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useParams } from 'react-router-dom';
import API from '../API';

const SearchBar = ({ placeholder}) => {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData ] = useState(data)
    const [wordEntered, setWordEntered] = useState('')
    
    const { categoryId } = useParams();
    const categoryIdMatch = categoryId.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ')
    useEffect(() => {
        async function fetchData() {
            try {
            const res = await API.get(`/questions/?category[eq]=${categoryIdMatch}`)
                setData(res.data.data)
                setFilteredData(res.data.data)
            return
            } catch (error) {
            console.log(error)
           }}
              fetchData()
                 })
    
    
    //search for word typed in the search bar
    const handleFilter = (event) => {
        const searchWord = event.target.value
        let result = []
        result = data.filter((data) => {
            return data.question.toLowerCase().includes(searchWord.toLowerCase());
        })
        setWordEntered(searchWord)
        if (searchWord === "") {
            setFilteredData([])
        } else {
             setFilteredData(result)
        }
    }
    //clear input with close icon 
    const clearInput = () => {
        setFilteredData([]);
        setWordEntered('');
    }

    
        // let navigate = useNavigate()
        // const routeChange = () => {
        // let path = './QnA/QuestionAndAnswers.js'
        // navigate(path)
        // }


  return (
      <div className={classes.search}>
          <div className={classes.searchInputs}>
              <input
                  type='text'
                  placeholder={placeholder}
                  value={wordEntered}
                  onChange={handleFilter}
              />

              <div className={classes.searchIcon}>
                  {wordEntered.length  === 0 ?
                      (<SearchIcon />) : (<CloseIcon id='clearBtn' onClick={clearInput} />)}
              </div>
          </div>
            {/* WILL SHOW IF THE ARRAY IS NOT EMPTY */}
          {wordEntered.length !== 0 && (
                <div className={classes.dataResults}>
              {filteredData.slice(0,5).map((value , key ) => {
                  return (
                        <Link to={`/qna/${categoryId}/${value.id}`} key={value.id}>
                          <div className={classes.dataItem} href={value.question} >
                            <p >{value.question.slice(0,40)}...</p>
                          </div> 
                       </Link>
                  )
                 
              })}
          </div>
          )
          }
          
    </div>
  )
}

export default SearchBar

