import React, { useState } from "react";
// import "./SignUp.css";  // Same styling as Login
import axios, { AxiosResponse, AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import signupWindow from "../../assets/signup-window.png";
import submitButton from "../../assets/submit-button.png";
import welcomeWindow from "../../assets/welcome-window.png";
import errorWindow from "../../assets/long-window.png";
import closeButton from "../../assets/close-button.png";

interface IUserModel {
  username: string;
  password: string;
  confirmPassword: string;
}

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from the context

  const [data, setData] = useState<IUserModel>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState(false); // State to control password visibility
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  const togglePasswordVisibility = () => {
    setShowPasswords((prev) => !prev); // Toggle visibility
  };

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
        { withCredentials: true }
      );

      if (response.data === "Created user " + newUser.username.toLowerCase()) {
        console.log(response.data);
        login();
        navigate("/home");
      } /* else {
        alert(response.data);
      } */
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response && err.response.data) {
          console.log(err.response?.data?.message);
          setErrorMessage(err.response?.data?.message);
        } else {
          // invalid or missing error message
          console.log(err);
        }
      } else {
        console.log(err);
      }
    }
  };

  const handleCloseError = () => {
    setErrorMessage(null);
  };

  return (
    <div id="auth">
      <div className="auth-container">
        <img
          className="welcome-image"
          src={welcomeWindow}
          alt="Welcome window"
        />
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div className="input">
                <input
                  type="text"
                  placeholder="username"
                  id="username"
                  value={data.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input">
                <PasswordInput
                  id="password"
                  value={data.password}
                  placeholder="password"
                  onChange={handleInputChange}
                  showPassword={showPasswords}
                  toggleVisibility={togglePasswordVisibility}
                />
              </div>
              <div className="input">
                <PasswordInput
                  id="confirmPassword"
                  value={data.confirmPassword}
                  placeholder="confirm password"
                  onChange={handleInputChange}
                  showPassword={showPasswords}
                  toggleVisibility={togglePasswordVisibility}
                />
              </div>
            </div>
            <div className="forgot-password text-center">
              Already have an account? <Link to="/"> Click here!</Link>
            </div>
            <div className="error-message text-center" id="errorMessage"></div>
            <div className="submit-container">
              <button className="submit" type="submit">
                <img src={submitButton} alt="Submit" className="submit-image" />
              </button>
            </div>
          </form>
          <img
            className="auth-overlay-image"
            src={signupWindow}
            alt="Signup Image Overlay"
          />
        </div>
        {errorMessage && (
          <div className="error-container long">
            <img
              className="close-button shift"
              src={closeButton}
              alt="Close button"
              onClick={handleCloseError}
            />
            <img className="error-image" src={errorWindow} alt="Error window" />
            <div className="error-message text-center">{errorMessage}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
