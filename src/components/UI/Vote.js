import React, { useState, useEffect } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import classes from "./Vote.module.css";


const Vote = () => {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(prevCount => {
      const newCount = Number(prevCount) + 1;
      localStorage.setItem("count", newCount);
      return newCount;
    });
  };

  const decrease = () => {
    setCount(prevCount => {
      const newCount = Number(prevCount) - 1;
      localStorage.setItem("count", newCount);
      return newCount;
    });
  };

  useEffect(() => {
    const initialValue = localStorage.getItem("count");
    if (initialValue) setCount(initialValue);
  }, []);

  // Just to show you the localStorage Value
  console.log(localStorage.getItem("count"));

  return (
    <div className={classes["vote-container"]}>
      <button className={classes["vote-btn"]} onClick={increase} disabled={count === 1}><KeyboardArrowUpIcon style={{ color: '#666' }} fontSize="large" /> </button>
        <div className={classes.count}>{count}</div>
      <button className={classes["vote-btn"]} onClick={decrease} disabled={count === -1}><KeyboardArrowDownIcon style={{ color: '#666' }} fontSize="large" /> </button>

    </div>
  );
};

export default Vote;


// import React, { useState } from 'react';

// const Upvote = () => {
//     const [count, setCount] = useState(0);

//     const increment = () => {
//         setCount(count + 1)
//     }

//     const decrement = () => {
//         setCount(count - 1)
//     }

//     return (

//       <div className={classes["vote-container"]}>
//       <button onClick={increment} disabled={count === 1}><KeyboardArrowUpIcon fontSize="large" /> </button>
//         <div className={classes.count}>{count}</div>
//       <button onClick={decrement} disabled={count === -1}><KeyboardArrowDownIcon fontSize="large" /> </button>

//       </div>
//     )
// }

// export default Upvote;



