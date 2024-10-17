import React, { useState } from 'react'
import './LoginSignup.css'

import user_icon from '../Assets/person.png'
import password_icon from '../Assets/password.png'


export const LoginSignup = () => {

    const [action, setAction] = useState("Login");

  return (
    <div className='container'>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <img src={user_icon} alt="" />
                <input type="text" placeholder="username"/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" placeholder="password"/>
            </div>
            {action==="Login"?<div></div>:<div className="input">
                <img src={password_icon} alt="" />
                <input type="confirmPassword" placeholder="confirm password" />
            </div>}

        </div>
        {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot your password? <span>Click Here!</span></div>
        }
        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
        </div>
    </div>
  )
}

export default LoginSignup
