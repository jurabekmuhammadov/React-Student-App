import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
const Header = () => {
  const { userFromServer } = useAuth();
  if (
    userFromServer.username &&
    userFromServer.password &&
    userFromServer.isLoggedIn === true
  ) {
    return (
      <header>
        <div className="container header__container">
          <h1>Student App</h1>

          <div className="profile">
            <Link to="/profile" title={"View profile"}>
              {userFromServer.username}
              <img src={userFromServer.avatar} alt="" />
            </Link>
          </div>
        </div>
      </header>
    );
  } else {
    return null;
  }
};

export default Header;
