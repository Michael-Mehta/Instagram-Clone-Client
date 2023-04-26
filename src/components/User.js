import Signup from "./Signup";
import Login from './Login'
import MainPage from "./MainPage";

import { useState } from "react";
const User = ({currUser, setCurrUser}) => {
    const [show, setShow]=useState(false)
   
    return (
        <div>
            { show?
                <Login setCurrUser={setCurrUser} setShow={setShow}/>  
                :
                <Signup setCurrUser={setCurrUser}  setShow={setShow} />
            }
        </div>
    )
}
export default User