import React, { useState } from "react";
import "./SignUp.css";
import user_icon from "../../assets/person.png";
import axios, { AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";
import PasswordInput from "../../components/PasswordInput/PasswordInput";

interface IUserModel {
  username: string;
  password: string;
  confirmPassword: string;
}

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [data, setData] = useState<IUserModel>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState(false); // State to control password visibility

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

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

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
      } else {
        alert(response.data);
      }
    } catch (err) {
      console.log("Error on signup request: ", err);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="header">
            <div className="text">Sign Up</div>
            <div className="underline" />
          </div>

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
              showPassword={showPasswords}
              toggleVisibility={togglePasswordVisibility}
            />
          </div>
          <div className="input">
            <PasswordInput
              id="confirmPassword"
              value={data.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleInputChange}
              showPassword={showPasswords}
              toggleVisibility={togglePasswordVisibility}
            />
          </div>

          <div className="forgot-password text-center">
            Already have an account? <Link to="/"> Click Here!</Link>
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

export default SignUp;
