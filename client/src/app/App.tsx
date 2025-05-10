import { Link, Outlet } from "react-router-dom";
import { IoLogoGithub } from "react-icons/io";
const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const REDIRECT_URI = "http://localhost:5173/auth/callback";

const App = () => {
  return (
    <section className="layoutSite">
      <header className="container">
        <IoLogoGithub className="logo" />
        <nav>
          <Link to="/profile">Profile</Link>
          <Link to="/users">Users</Link>
          <Link to="/repository">Repository</Link>
          <a
          href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`}
        >
          Auth
        </a>
        </nav>
        <img src={""} alt="" />
      </header>
      <hr />
      <main className="container">
        <Outlet />
      </main>
      <footer>
        <p>
          © 2024–2025. Built with ♡ using{" "}
          <a href="https://vitejs.dev/" target="_blank">
            Vite
          </a>{" "}
          <a href="https://github.com/Bekzattdev" target="_blank">Bekzattdev</a>
        </p>
      </footer>
    </section>
  );
};

export default App;
