import React, { useState } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components"; // Import keyframes
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://myspringapp-env.eba-guzhenp3.us-east-1.elasticbeanstalk.com/student/logins", {
        email,
        password,
      });

      if (response.status === 200) {
        alert("Login Successful");
        sessionStorage.setItem("email", email);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <StyledWrapper>
      <Blob1 />
      <Blob2 />
      <Blob3 />
      <div className="container">
        <div className="heading">Login</div>
        <form className="form" onSubmit={handleSubmit}>
          <InputGroup>
            <input
              placeholder="Email ID"
              id="email"
              name="email"
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Mail className="input-icon" size={20} />
          </InputGroup>
          <InputGroup>
            <input
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Lock className="input-icon" size={20} />
          </InputGroup>

          <div className="options-row">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot" className="forgot-link">
              Forgot Password?
            </a>
          </div>

          <input value="Login" type="submit" className="login-button" />
        </form>
        {error && <p className="error-message">{error}</p>}

        <div className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>
    </StyledWrapper>
  );
};

// Define keyframes for a more subtle, floating animation
const move = keyframes`
  0%, 100% {
    transform: scale(1) translate(0, 0);
  }
  25% {
    transform: scale(1.1) translate(20px, -30px);
  }
  50% {
    transform: scale(0.9) translate(-20px, 40px);
  }
  75% {
    transform: scale(1.2) translate(-40px, -20px);
  }
`;

// Base styled component for the blobs
const Blob = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.6;
  z-index: 0;
  animation: ${move} linear infinite;
`;

// Create several blobs with different styles and animation speeds
const Blob1 = styled(Blob)`
  width: 450px;
  height: 450px;
  top: -100px;
  left: -150px;
  background: rgba(59, 130, 246, 0.4);
  animation-duration: 18s;
`;

const Blob2 = styled(Blob)`
  width: 350px;
  height: 350px;
  bottom: -150px;
  right: -150px;
  background: rgba(129, 140, 248, 0.4);
  animation-duration: 22s;
  animation-delay: -8s;
`;

const Blob3 = styled(Blob)`
  width: 250px;
  height: 250px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(30, 64, 175, 0.3);
  animation-duration: 25s;
`;

// Styled Components
const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
  background: #0f172a; /* Dark blue fallback */

  /* The main gradient is now on a pseudo-element to sit above the moving blobs */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #0f172a 0%, #1e40af 60%, #e2e8f0 100%);
    z-index: 1;
    opacity: 0.9;
  }

  .container {
    max-width: 450px;
    width: 90%;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 20px;
    padding: 40px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
    z-index: 2; /* Ensure the container is on top of all background elements */
  }

  .heading {
    text-align: center;
    font-weight: 700;
    font-size: 32px;
    color: #fff;
    margin-bottom: 30px;
  }

  .form {
    margin-top: 20px;
  }

  .input {
    width: 100%;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.4);
    padding: 12px 40px 12px 20px;
    border-radius: 10px;
    margin-top: 15px;
    color: #fff;
    outline: none;
    transition: all 0.3s ease;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
    &:focus {
      border-color: rgba(255, 255, 255, 0.7);
      background: rgba(255, 255, 255, 0.3);
    }
  }

  .options-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    font-size: 14px;
  }

  .remember-me {
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.8);
    input[type="checkbox"] {
      margin-right: 8px;
      accent-color: #fff;
    }
  }

  .forgot-link {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover {
      color: #fff;
    }
  }

  .login-button {
    display: block;
    width: 100%;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.5);
    color: #fff;
    padding-block: 15px;
    margin-top: 30px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: rgba(255, 255, 255, 0.5);
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
    }
  }

  .error-message {
    color: #ffcccc;
    text-align: center;
    margin-top: 15px;
    font-size: 14px;
  }

  .register-link {
    margin-top: 30px;
    text-align: center;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    a {
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
  .input-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.7);
    pointer-events: none;
  }
  &:first-of-type {
    margin-top: 0;
  }
`;

export default Login;

