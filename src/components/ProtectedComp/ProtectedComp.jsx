import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedComp = ({ children }) => {
  const { userFromServer } = useAuth();

  if (
    userFromServer.username &&
    userFromServer.password &&
    userFromServer.isSignedUp === true &&
    userFromServer.isLoggedIn === true
  ) {
    return <div style={{ width: "100%", height: "100%" }}>{children}</div>;
  } else {
    return <Navigate to="/" />;
  }
};

ProtectedComp.propTypes = {
  children: PropTypes.element,
};
export default ProtectedComp;
