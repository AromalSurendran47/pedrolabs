import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Authnew() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added for Confirm Password
  const [registerStatus, setRegisterStatus] = useState("");
  const navigate = useNavigate();
  const baseURL = "http://localhost:3001"; // Backend API URL

  // **Function to handle user registration**
  const handleRegister = (e) => {
    e.preventDefault();

    // **Frontend Validation**
    if (!fname.trim() || !lname.trim() || !email.trim() || !password.trim()) {
      setRegisterStatus("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setRegisterStatus("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      setRegisterStatus("Password must be at least 6 characters long.");
      return;
    }

    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[@$!%*?&]/.test(password)
    ) {
      setRegisterStatus(
        "Password must contain uppercase, lowercase, number, and special character."
      );
      return;
    }

    // Confirm Password Validation
    if (password !== confirmPassword) {
      setRegisterStatus("Passwords do not match.");
      return;
    }

    // **Send Registration Request**
    axios
      .post(`${baseURL}/register`, { fname, lname, email, password })
      .then((response) => {
        if (response.data.success) {
          setRegisterStatus(
            `Registration successful! You are registered as ${response.data.role}. Please log in.`
          );
          setIsRegistering(false);

          // Clear the form fields
          setFname("");
          setLname("");
          setEmail("");
          setPassword("");
          setConfirmPassword(""); // Clear Confirm Password field
        } else {
          // If the response indicates failure (e.g., email already exists)
          setRegisterStatus(response.data.message || "Registration failed.");
        }
      })
      .catch((err) => {
        // This will catch network errors or other unexpected issues
        console.error(err);
        if (err.response && err.response.data) {
          // Handle specific backend errors here
          setRegisterStatus(
            err.response.data.message ||
              "An error occurred during registration. Please try again."
          );
        } else {
          setRegisterStatus(
            "An error occurred during registration. Please try again."
          );
        }
      });
  };

  // **Function to handle user login**
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setRegisterStatus("All fields are required.");
      return;
    }

    axios.post(`${baseURL}/login`, { email, password })
    .then((response) => {
      if (response.data.success) {
       
        const user = response.data.user; // Extract user object
        
        sessionStorage.setItem("userId", user.id); 
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("userName", `${user.fname} ${user.lname}`);
        sessionStorage.setItem("role", user.role); 
        sessionStorage.setItem("token", response.data.token); // Store token
  
        setRegisterStatus("Login successful!");
        navigate("/"); 
      } else {
        setRegisterStatus(response.data.message);
      }
    })
    .catch((err) => {
      console.error(err);
      setRegisterStatus("Invalid email or password.");
    });
  
  };

  return (
    <div>
      <Container className="my-5">
        <Row className="justify-content-md-center">
          <Col md={8} lg={6} xl={4}>
            <Card className="shadow-lg rounded">
              <Card.Body>
                <h3 className="text-center mb-4">
                  {isRegistering ? "Register" : "Login"}
                </h3>

                {isRegistering ? (
                  // **Registration Form**
                  <Form onSubmit={handleRegister}>
                    <Form.Group controlId="formFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    {/* **Confirm Password field added** */}
                    <Form.Group controlId="formConfirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="mt-3 w-100"
                    >
                      Register
                    </Button>
                  </Form>
                ) : (
                  // **Login Form**
                  <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="mt-3 w-100"
                    >
                      Login
                    </Button>
                  </Form>
                )}

                <div className="text-center mt-4">
                  {isRegistering ? (
                    <p>
                      Already have an account?{" "}
                      <a href="#" onClick={() => setIsRegistering(false)}>
                        Login here.
                      </a>
                    </p>
                  ) : (
                    <p>
                      Don't have an account?{" "}
                      <a href="#" onClick={() => setIsRegistering(true)}>
                        Register here.
                      </a>
                    </p>
                  )}
                </div>

                {/* Display status message */}
                {registerStatus && (
                  <p className="text-center text-danger">{registerStatus}</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Authnew;
