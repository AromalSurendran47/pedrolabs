import React, { useState } from "react";
import Axios from "axios";
import "./Register.css";
import { data } from "react-router-dom";

const SignInSignUpForm = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const baseURL = "http://35.154.208.64:3001"; // Backend API URL

  const register = (e) => {
    e.preventDefault();

    if (!fname || !lname || !email || !password) {
      setRegisterStatus("Please fill out all fields.");
      return;
    }

    console.log("Sending registration data:", {
      fname,
      lname,
      email,
      password,
    });

    Axios.post(`${baseURL}/register`, {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
    })
      .then((response) => {
        console.log("result", response.data);
        if (response.data.success) {
          setRegisterStatus(response.data.message);
          window.location.href = "/"; // Redirect after successful registration
        } else {
          setRegisterStatus(response.data.message); // Show error message
        }
      })
      .catch((err) => {
        console.error(err);
        setRegisterStatus(
          "An error occurred during registration. Please try again later."
        );
      });
  };

  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  return (
    <div>
      <h2>Weekly Coding Challenge #1: Sign in/up Form</h2>
      <div
        className={`container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form onSubmit={register}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              placeholder="Firstname"
              onChange={(e) => setFname(e.target.value)}
              name="fname"
            />
            <input
              type="text"
              placeholder="Lastname"
              onChange={(e) => setLname(e.target.value)}
              name="lname"
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />

            <center>
              <input
                className="custom-btn btn-1"
                type="submit"
                value="Sign Up"
              />
            </center>
            <h1
              style={{
                fontSize: "15px",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              {registerStatus}
            </h1>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" onClick={handleSignInClick} id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={handleSignUpClick} id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>
          Created with <i className="fa fa-heart"></i> by
          <a target="_blank" rel="noreferrer" href="https://florin-pop.com">
            {" "}
            Florin Pop
          </a>
          - Read how I created this and how you can join the challenge
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/"
          >
            here
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default SignInSignUpForm;
