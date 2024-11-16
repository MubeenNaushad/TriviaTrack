import React,{useState,useCallback} from "react";
import {useNavigate} from "react-router-dom";
const Livesession=()=>{
    const [value,setValue]=useState();
     const navigate= useNavigate();
    const handlejoinroom=useCallback(()=>{
       
        navigate(`/room/${value}`);
        },
         [navigate,value]
   );
    return(
    <div className="py-20 px-80">
      <input value={value} onChange={e=>setValue(e.target.value)}
       type="text" placeholder="Enter Room Id"></input>
      <button onClick={handlejoinroom}>Join</button>
    </div>
)
}
export default Livesession;