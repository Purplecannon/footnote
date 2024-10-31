import React, { useState } from "react";
import "./Login.css";
import user_icon from "../Assets/person.png";
import password_icon from "../Assets/password.png";
import axios, { AxiosResponse } from "axios";
import { Link } from "react-router-dom";

interface ILoginModel {
  username: string;
  password: string;
}

/**
 * Login Component
 *
 * This component provides a form for logging up. It displays inputs for
 * username and password.
 *
 * @returns {TSX.Element} The rendered Login form.
 */
export const Login: React.FC = () => {

  const [data, setData] = useState<ILoginModel>({username: "", password: ""});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.target.value;

    setData({...data, [id]: value})
  }

  const [message, setMessage] = useState<string>("")

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // console.log(data)

    const newUser: ILoginModel = {
      username: data.username,
      password: data.password,
    };


    axios.post<ILoginModel>("http://localhost:3000/users/login", newUser)
    .then((response: AxiosResponse<ILoginModel>) => {
      console.log(response.data)
    })
    .catch((err) => {
      console.log("Error on login request: ", err);
    })
  }

  return (
    <div className="container">
      {/* Header section with current action text and underline */}
      <form action = "POST">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline" />
      </div>

      {/* Input fields for username and password */}
      <div className="inputs">
        {/* Username input */}
        <div className="input">
          <img src={user_icon} alt="User Icon" />
          <input type="text" placeholder="username" id = "username" value = {data.username} onChange={handleInputChange}/>
        </div>

        {/* Password input */}
        <div className="input">
          <img src={password_icon} alt="Password Icon" />
          <input type="password" placeholder="password" id = "password" value = {data.password} onChange={handleInputChange}/>
        </div>
      </div>

      {/* Display the message if it exists */}
      {message && <div className="error-message">{message}</div>}

      {/* Conditional "Forgot your password?" link, only in Login mode */}
        <div className="forgot-password">
          Don't have an account? <Link to="/signup"> Click Here!</Link>
        </div>

      {/* Buttons to toggle between "Login" and "Sign Up" */}
      <div className="submit-container">
        {/* Button to switch to Sign Up mode */}

        {/* Button to switch to Login mode */}
        <button className="submit">
          <div
          className={"submit"}
          role="button"
          tabIndex={0}
          onClick={handleSubmit}
          >
            Submit
            </div>
          </button>
      </div>
      </form>
    </div>
  );
};

export default Login;
