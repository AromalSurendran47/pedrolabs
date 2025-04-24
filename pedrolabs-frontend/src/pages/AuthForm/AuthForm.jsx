import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import './AuthForm.css'; // Include custom CSS

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Logging in with:', email, password);
    } else {
      console.log('Signing up with:', username, email, password);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Container fluid className="auth-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="auth-card">
            <Card.Body>
              <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
              <Form onSubmit={handleSubmit}>
                {/* Username Field (only for signup) */}
                {!isLogin && (
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)} 
                      required 
                    />
                  </Form.Group>
                )}

                {/* Email Field */}
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

                {/* Password Field */}
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

                <Button variant="primary" type="submit" className="w-100 auth-btn">
                  {isLogin ? 'Login' : 'Sign Up'}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Button variant="link" onClick={toggleForm} className="auth-toggle-btn">
                  {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
