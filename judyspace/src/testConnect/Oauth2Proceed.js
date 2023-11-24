import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Oauth2Proceed() {
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useParams();
  useEffect(() => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    navigate("/");
  }, []);
}
