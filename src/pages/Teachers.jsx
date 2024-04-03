import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import TeachersDashboard from "../components/MuiConponents/TeachersDashboard";
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
        <TeachersDashboard />
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
