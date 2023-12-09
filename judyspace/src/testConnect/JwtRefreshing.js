import axios from "axios";
import { useEffect } from "react";

export default function JwtRefreshing() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8080/api/users/getCurrentUserInfo",
        {
          method: "GET",
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            console.log(data);
          });
        } else {
          if (response.status === 401) {
            refreshAccessToken();
          }
          response.json().then((data) => {
            console.log("vao roi");
            console.log(data);
          });
        }
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const checkTokenExpiration = () => {
      // Check if the access token exists in the local storage
      const accessToken = localStorage.getItem("accessToken");

      // If the access token is present, check if it's expired
      if (accessToken) {
        const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");

        // Calculate the remaining time until the token expiration
        const currentTime = new Date().getTime() / 1000;
        const expiresIn = tokenExpiresAt - currentTime;

        // If the token is expired or about to expire within 60 seconds, refresh it
        if (expiresIn <= 60) {
          refreshAccessToken();
        }
      }
    };

    checkTokenExpiration();

    // Setup an interval to periodically check the token expiration
    const interval = setInterval(checkTokenExpiration, 60000); // Repeat every minute

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);
  const refreshAccessToken = () => {
    fetch("http://localhost:8080/api/auth/refreshToken", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          localStorage.setItem("accessToken", data.value);
          console.log("refreshed: " + data.value);
        });
      } else {
        if (response.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      }
    });
  };
  return <div>hehe</div>;
}
