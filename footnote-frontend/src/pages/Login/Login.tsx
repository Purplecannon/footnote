import React, { useState } from "react";
import "./Login.css";
import user_icon from "../../assets/person.png";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";

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
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="header">
            <div className="text">Login</div>
            <div className="underline" />
          </div>
          <div className="inputs">
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
            <div className="input">
              <PasswordInput
                id="password"
                value={data.password}
                placeholder="Password"
                onChange={handleInputChange}
                showPassword={showPassword} // Pass visibility state
                toggleVisibility={togglePasswordVisibility} // Pass toggle function
              />
            </div>
          </div>
          <div className="error-message text-center" id="errorMessage"></div>
          <div className="forgot-password text-center">
            Don't have an account? <Link to="/signup"> Click Here!</Link>
          </div>
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
