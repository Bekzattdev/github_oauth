import { useEffect, useState } from "react";
import scss from "./Profile.module.scss";
interface IUserType {
  name: string;
  avatar_url: string;
  email: string;
  location: string;
  html_url: string;
  login: string;
}

const Profile = () => {
  const [user, setUser] = useState<IUserType | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUser(data);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };
  return (
    <section id={scss.profileSection}>
      {user && (
        <div className={scss.content}>
          <div>
            <img loading="lazy" src={user.avatar_url} width={100} />
            <h1> {user.name || user.login}!</h1>
          </div>
          <div>
            Email:
            <p> {user.email || "Не указан"}</p>
          </div>
          <div>
            Локация:
            <p> {user.location || "Не указана"}</p>
          </div>
          <div>
            <a target="_blank" href={user.html_url}>
              GitHub профиль
            </a>
          </div>
          <button onClick={handleLogout}>logout</button>
          </div>
      )}
    </section>
  );
};

export default Profile;
