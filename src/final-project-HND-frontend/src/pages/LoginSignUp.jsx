import React, {useState} from 'react'
import './CSS/LoginSignup.css'

const LoginSignUp = () => {

  const [state,setstate] = useState("Login");

  return (
    <div className='loginSignup'>
      <div className="loginSignup-container">
        <h1>{state}</h1>
        <div className="loginSignup-fields">
          {state==="Sign Up"?<input type="text" placeholder='Your Name' />:<></>}
          <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='Password' />
        </div>
        <button>Continue</button>
        {state==="Sign Up"
        ?<p className="loginSignup-login">Already have an account? <span onClick={()=>{setstate("Login")}}>Login here</span></p>
        :<p className="loginSignup-login">Create an account? <span onClick={()=>{setstate("Sign Up")}}>Click here</span></p>}        
          <div className="loginSignup-agree">
            <input type="checkbox" name='' id='' />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
      </div>
    </div>
  )
}

export default LoginSignUp