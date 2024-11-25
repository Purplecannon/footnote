import React, { useState } from "react";
import "./SignUp.css";
import user_icon from "../../assets/person.png";
import password_icon from "../../assets/password.png";
import axios, { AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

interface IUserModel {
  username: string;
  password: string;
  confirmPassword: string;
}

/**
 * SignUp Component
 *
 * This component provides a form for signing up. It displays inputs for
 * username, password, and a "confirm password" input field for
 * sign-up mode.
 *
 * @returns {TSX.Element} The rendered Login/Signup form.
 */
export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from the context

  const [data, setData] = useState<IUserModel>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.target.value;

    setData({ ...data, [id]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser: IUserModel = {
      username: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      const response: AxiosResponse<string> = await axios.post(
        `${API_BASE_URL}/users/create-user`,
        newUser,
        { withCredentials: true } // to send cookies with the request
      );

      if (response.data === "Created user " + newUser.username.toLowerCase()) {
        console.log(response.data);
        login();
        navigate("/home"); // Redirect to home page
      } else {
        alert(response.data); // Error message
      }
    } catch (err) {
      console.log("Error on signup request: ", err);
    }
  };

  return (
    <div className="container">
      {/* Header section with current action text and underline */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="header">
            <div className="text">Sign Up</div>
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
            <div className="input">
              <img src={password_icon} alt="Confirm Password Icon" />
              <input
                type="password"
                placeholder="confirm password"
                id="confirmPassword"
                value={data.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Conditional "Already have an account?" link */}
          <div className="forgot-password text-center">
            Already have an account? <Link to="/"> Click Here!</Link>
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

export default SignUp;
