import { useRef } from "react"
import { useNavigate } from "react-router-dom";

const Signup=({currUser, setCurrUser})=>{


    const navigate = useNavigate();
    const formRef = useRef()

    if(currUser) 
    return (
        <div>
        Hello {currUser.email}
      
       
        </div>
    )

    const signup = async (userInfo, setCurrUser)=>{
        const url="http://localhost:3000/signup"
        try{
            const response=await fetch(url, {
                method: 'POST',
                headers: {
                    "content-type": 'application/json',
                    "accept": "application/json"
                },
                body: JSON.stringify(userInfo)
            }) 
            const data=await response.json()
            if(!response.ok) throw data.error
            localStorage.setItem('token', response.headers.get("Authorization"))
            setCurrUser(data)
            console.log(data)
            navigate('/')
        } catch (error){
            console.log("error", error)
        }
    }
    const handleSubmit=e=>{
        e.preventDefault()
        const formData=new FormData(formRef.current)
        const data=Object.fromEntries(formData)
        const userInfo={
            "user":{ username: data.username, email: data.email, password: data.password }
        }
        signup(userInfo, setCurrUser)
        e.target.reset()
    }
    const handleClick=e=>{
        e.preventDefault()
        navigate('/login')
    }
    return(
        <div className="main-signup">

          <div className="form">

            <h1></h1>


        <form ref={formRef} onSubmit={handleSubmit} >

            <input type="text" name='username' placeholder="username" className="input-large" />
            <br/>
            <input type="email" name='email' placeholder="email" className="input-large" />
            <br/>
            <input type="password" name='password' placeholder="password" className="input-large" />
            <br/>
            <input type='submit' value="Submit" className="instagram-button"/>
        </form>
        <br />
        <div className="signupRegistration">Already registered, <a href="#login" onClick={handleClick} >Login</a> here.</div>
        </div>
    </div>
    )
}
export default Signup