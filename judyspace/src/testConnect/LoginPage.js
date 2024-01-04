import { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import JwtRefreshing from JwtRefreshing
export default function () {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  JwtRefreshing("asdasdasd")
  const HandleFormSubmit = (e) => {
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
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        localStorage.setItem("accessToken", responseData.accessToken);
        localStorage.setItem("refreshToken", responseData.refreshToken);
        // Only navigate on a successful response
        // navigate("/default");
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch.
        console.error("Fetch error:", error);
        // You can display an error message to the user or take other appropriate actions.
      });
  };
  return (
    <Container>
      <Form onSubmit={(e) => HandleFormSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Link to={"http://localhost:8080/oauth2/authorization/google"}>
            Login with Google
          </Link>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
