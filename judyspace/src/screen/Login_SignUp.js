import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../css/loginSignup.css";
import Modal from "react-bootstrap/Modal";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
library.add(faFacebookF, faInstagram, faLinkedinIn);

const Login_SignUp = () => {
  //toast
  const toastNow = () => {
    toast.error("dungmuahaha");
  };
  //popup reset password
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Toggle login/signup
  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    const handleRegisterClick = () => {
      container.classList.add("active");
    };

    const handleLoginClick = () => {
      container.classList.remove("active");
    };

    registerBtn.addEventListener("click", handleRegisterClick);
    loginBtn.addEventListener("click", handleLoginClick);

    // Cleanup event listeners
    return () => {
      registerBtn.removeEventListener("click", handleRegisterClick);
      loginBtn.removeEventListener("click", handleLoginClick);
    };
  }, []);
  //reset pass word
  const emailreset = useRef(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);
    const data = {
      email: emailreset.current.value,
    };
    fetch("http://localhost:8080/api/users/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 417) {
        window.open("/login");
        toast.warning("Đăng nhập trước khi thay đổi mật khẩu!");
      } else {
        if (response.status != 200) {
          response.json().then((data1) => {
            toast.error(data1.value);
          });
        } else {
          response.json().then((data1) => {
            toast.success(data1.value);
          });
        }
      }
    });
  };
  // Form management
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const username = useRef(null);
  const emailRG = useRef(null);
  const passwordRG = useRef(null);
  const navigate = useNavigate();
  const HandleRegister = (e) => {
    e.preventDefault();
    const info = {
      email: emailRG.current.value,
      userName: username.current.value,
      password: passwordRG.current.value,
    };
    fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    }).then((response) => {
      if (response.status !== 200) {
        response.json().then((data2) => {
          toast.error(data2.value);
        });
      } else {
        response.json().then((data2) => {
          navigate("/");
          toast.success("Đăng kí thành công,vui lòng kiểm tra email");
        });
      }
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    fetch("http://localhost:8080/api/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status !== 200) {
        response.json().then((data2) => {
          toast.error(data2.value);
        });
      } else {
        response.json().then((data2) => {
          localStorage.setItem("accessToken", data2.accessToken);
          localStorage.setItem("refreshToken", data2.refreshToken);
          toast.success("Đăng nhập thành công!");
          navigate("/");
        });
      }
    });
  };

  return (
    <div className="background-login">
      <div className="container containerLogin" id="container">
        <div className="form-container sign-up">
          <form onSubmit={(e) => HandleRegister(e)}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a
                href="http://localhost:8080/oauth2/authorization/google"
                className="icon"
              >
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className="icon">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="icon">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" name="name" ref={username} />
            <input
              type="email"
              placeholder="Email"
              name="email"
              ref={emailRG}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              ref={passwordRG}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a
                href="http://localhost:8080/oauth2/authorization/google "
                className="icon"
              >
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className="icon">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="icon">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="icon">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
            <span>or use your email and password</span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              ref={emailRef}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              ref={passwordRef}
              required
            />
            <>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Reset password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form></Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoFocus
                      ref={emailreset}
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    disabled={isButtonDisabled}
                    onClick={handleEmailSubmit}
                  >
                    Send to email
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
            <a onClick={handleShow}>Forgot Your Password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all site features</p>
              <button className="hidden" id="login" type="button">
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all site features
              </p>
              <button className="hidden" id="register" type="button">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login_SignUp;
