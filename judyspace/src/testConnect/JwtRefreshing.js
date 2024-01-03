import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
export default function JwtRefreshing(api) {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(api, {
        method: "GET",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            console.log(data);
          });
        } else {
          if (response.status === 401) {
            refreshAccessToken().then(() => {
              fetchData();
            });

            console.log("da hell");
          }
          if (response.status === 417) {
            toast.error("đăng nhập đê bạn ê");
            window.location.href = "/login";
          } else {
            response.json().then((data) => {
              console.log("vao roi");
              console.log(data);
            });
          }
        }
      });
    };
    fetchData();
  }, []);
  const refreshAccessToken = async () => {
    fetch("http://localhost:8080/api/auth/refreshToken", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
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
