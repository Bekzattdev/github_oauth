import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      const postUser = async () => {
        try {
          const res = await axios.post("http://localhost:4200/auth/github", {
            code,
          });
          const accessToken = res.data.access_token;
          console.log("Access token:", res.data.access_token);
          if (accessToken) {
            localStorage.setItem("access_token", accessToken);
            navigate("/profile");
          } else {
            console.log("Токен не получен");
          }
        } catch (e) {
          console.error("ошибка при автоизации", e);
        }
      };

      postUser();
    }
  }, []);
  return <p>Авторизация через GitHub...
  </p>;
};

export default AuthCallback;
