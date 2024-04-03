import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import StudentsDashboard from "../components/MuiConponents/StudentsDashboard";
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
        <StudentsDashboard />
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
