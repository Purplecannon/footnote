import React, { useState } from "react";
import "./Login.css";
import user_icon from "../../assets/person.png";
import password_icon from "../../assets/password.png";
import axios, { AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

interface ILoginModel {
  username: string;
  password: string;
}

/**
 * Login Component
 *
 * This component provides a form for logging in. It displays inputs for
 * username and password.
 *
 * @returns {TSX.Element} The rendered Login form.
 */
export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from the context

  const [data, setData] = useState<ILoginModel>({ username: "", password: "" });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.target.value;

    setData({ ...data, [id]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser: ILoginModel = {
      username: data.username,
      password: data.password,
    };

    try {
      const response: AxiosResponse<string> = await axios.post(
        `${API_BASE_URL}/users/login-user`,
        newUser,
        { withCredentials: true } // to send cookies with the request
      );

      if (
        response.data ===
        "Login successful for user " + newUser.username.toLowerCase()
      ) {
        console.log(response.data); // Login successful message
        login(); // Update the global authentication state
        navigate("/home"); // Redirect to home page
      } else {
        alert(response.data); // Show error message
      }
    } catch (err) {
      console.log("Error on login request: ", err);
    }
  };

  return (
    <div className="container">
      {/* Header section with current action text and underline */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="header">
            <div className="text">Login</div>
            <div className="underline" />
          </div>

          {/* Input fields for username and password */}
          <div className="inputs">
            {/* Username input */}
            <div className="input">
              <img src={user_icon} alt="User Icon" />
              <input
                type="text"
                placeholder="username"
                id="username"
                value={data.username}
                onChange={handleInputChange}
              />
            </div>

            {/* Password input */}
            <div className="input">
              <img src={password_icon} alt="Password Icon" />
              <input
                type="password"
                placeholder="password"
                id="password"
                value={data.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Conditional "Forgot your password?" link, only in Login mode */}
          <div className="forgot-password text-center">
            Don't have an account? <Link to="/signup"> Click Here!</Link>
          </div>

          {/* Submit button */}
          <div className="submit-container">
            <button className="submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
