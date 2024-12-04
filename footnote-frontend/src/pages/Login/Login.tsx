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

interface ILoginModel {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [data, setData] = useState<ILoginModel>({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility

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
      if(err instanceof AxiosError) {
        if(err.response && err.response.data) {
          console.log(err.response?.data?.message);
          var errorMessage = document.getElementById("errorMessage");
          if(errorMessage) {
            errorMessage.innerHTML = err.response?.data?.message;
          }
        }
        else {
          // invalid or missing error message
          console.log(err);
        }
      }
      else {
        console.log(err);
      }
    }
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
            <div className="error-message text-center" id="errorMessage"></div>
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
      </div>
    </div>
  );
};

export default Login;
