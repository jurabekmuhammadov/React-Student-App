import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import googleLogo from "../assets/google.svg";
import appleLogo from "../assets/apple.svg";
import authImg from "../assets/auth-img.png";
const Login = () => {
  const { login } = useAuth();
  const [userLogin, setUserLogin] = useState({ username: "", password: "" });
  const [userFromServer, setUserFromServer] = useState({});
  const getUserData = async () => {
    await axios
      .get("http://localhost:3000/user")
      .then((res) => {
        setUserFromServer(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getUserData();
  }, [userFromServer]);
  const handleSubmit = (e) => {
    e.preventDefault();
    login(userLogin);
    setUserLogin({ username: "", password: "" });
  };

  return (
    <div id="login">
      <div className="container login__container">
        <div className="left">
          <form onSubmit={handleSubmit}>
            <div className="title">
              <h1>Welcome Back!</h1>
              <p>Enter your Credentials to access your account</p>
            </div>
            <div className="username">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                required
                value={userLogin.username}
                onChange={(e) =>
                  setUserLogin({
                    ...userLogin,
                    username: e.target.value.trim().toLowerCase(),
                  })
                }
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                value={userLogin.password}
                onChange={(e) =>
                  setUserLogin({
                    ...userLogin,
                    password: e.target.value.trim().toLowerCase(),
                  })
                }
              />
            </div>
            <div className="agree">
              <input type="checkbox" id="agree" />
              <label htmlFor="agree">I agree to the terms & policy</label>
            </div>
            <button type="submit" id="submit">
              Sign in
            </button>
          </form>
          <div className="line">
            <div></div>
            <span>Or</span>
            <div></div>
          </div>
          <div className="bottom">
            <div className="accounts">
              <Link className="google" to="/">
                <img src={googleLogo} alt="google" />
                <span>Sign in with Google</span>
              </Link>
              <Link className="apple" to="/">
                <img src={appleLogo} alt="apple" />
                <span>Sign in with Apple</span>
              </Link>
            </div>
            <p>
              Don`t have an account? <Link to={"/"}>Sign up</Link>
            </p>
          </div>
        </div>
        <div className="right">
          <img src={authImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
