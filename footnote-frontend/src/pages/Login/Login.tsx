import React, { useState } from "react";
import "./Login.css";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";
import loginWindow from "../../assets/login-window.png";
import submitButton from "../../assets/submit-button.png";
import welcomeWindow from "../../assets/welcome-window.png";
import errorWindow from "../../assets/small-window.png";
import closeButton from "../../assets/close-button.png";

interface ILoginModel {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [data, setData] = useState<ILoginModel>({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle visibility
  };

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
        { withCredentials: true }
      );

      if (
        response.data ===
        "Login successful for user " + newUser.username.toLowerCase()
      ) {
        login();
        navigate("/home");
      }
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
                  showPassword={showPassword} // Pass visibility state
                  toggleVisibility={togglePasswordVisibility} // Pass toggle function
                />
              </div>
            </div>
            <div className="forgot-password text-center">
              Don't have an account? <Link to="/signup"> Click here!</Link>
            </div>
            <div className="submit-container">
              <button className="submit" type="submit">
                <img src={submitButton} alt="Submit" className="submit-image" />
              </button>
            </div>
          </form>
          <img
            className="auth-overlay-image"
            src={loginWindow}
            alt="Login Image Overlay"
          />
        </div>
        {errorMessage && (
          <div className="error-container">
            <img
              className="close-button"
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

export default Login;
