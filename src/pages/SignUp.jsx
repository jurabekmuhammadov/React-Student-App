import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, Navigate } from "react-router-dom";
import googleLogo from "../assets/google.svg";
import appleLogo from "../assets/apple.svg";
import authImg from "../assets/auth-img.png";
const SignUp = () => {
  const { signUp, userFromServer } = useAuth();
  const [user, setUser] = useState({ username: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(user);
    setUser({ username: "", password: "" });
  };
  if (!userFromServer.username && !userFromServer.password) {
    return (
      <div id="sign-up">
        <div className="container signup__container">
          <div className="left">
            <form onSubmit={handleSubmit}>
              <h1>Get Started Now</h1>
              <div className="username">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                  value={user.username}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      username: e.target.value.trim(),
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
                  value={user.password}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      password: e.target.value.trim(),
                    })
                  }
                />
              </div>
              <div className="agree">
                <input type="checkbox" id="agree" />
                <label htmlFor="agree">I agree to the terms & policy</label>
              </div>
              <button type="submit" id="submit">
                Sign up
              </button>
            </form>
            <div className="line">
              <div></div>
              <span>Or</span>
              <div></div>
            </div>
            <div className="bottom">
              <div className="accounts">
                <Link className="google">
                  <img src={googleLogo} alt="google" />
                  <span>Sign in with Google</span>
                </Link>
                <Link className="apple">
                  <img src={appleLogo} alt="apple" />
                  <span>Sign in with Apple</span>
                </Link>
              </div>
              <p>
                Have an account? <Link to={"/login"}>Sign in</Link>
              </p>
            </div>
          </div>
          <div className="right">
            <img src={authImg} alt="" />
          </div>
        </div>
      </div>
    );
  } else if (userFromServer.username && userFromServer.password) {
    return <Navigate to="/home" />;
  }
};

export default SignUp;
