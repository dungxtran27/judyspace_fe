import { useEffect, useState } from "react";

export default function DisplayUserInfo() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refereshToken");
  const [user, SetUser] = useState("");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  useEffect(() => {
    fetch("http://localhost:8080/api/users/testingSecurity", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        SetUser(data.userName);
      });
  }, []);
  return <h1>HELLO {user}</h1>;
}
