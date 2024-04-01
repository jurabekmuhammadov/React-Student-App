import { Navigate } from "react-router-dom";
import Students from "../components/Students/Students";
import { useAuth } from "../hooks/useAuth";
const Home = () => {
  const { userFromServer } = useAuth();
  if (
    userFromServer.username &&
    userFromServer.password &&
    userFromServer.isSignedUp &&
    userFromServer.isLoggedIn
  ) {
    return (
      <>
        <Students />
      </>
    );
  } else if (
    !userFromServer.username &&
    !userFromServer.password &&
    !userFromServer.isSignedUp &&
    !userFromServer.isLoggedIn
  ) {
    return <Navigate to="/" />;
  }
};

export default Home;
