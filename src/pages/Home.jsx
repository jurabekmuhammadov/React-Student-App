import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AntDashboard from "../components/AntComponents/AntDashboard";
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
        <AntDashboard />
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
