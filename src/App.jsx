import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { AuthProvider } from "./hooks/useAuth";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ProtectedComp from "./components/ProtectedComp/ProtectedComp";
import { GlobalProvider } from "./state/state-managment";
import AntSidebar from "./components/AntComponents/AntDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalProvider>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                // <ProtectedComp>
                  <AntSidebar title={"Students"} />
                /* </ProtectedComp> */
              }
            />
            <Route
              path="/teachers"
              element={
                // <ProtectedComp>
                  <AntSidebar title={"Teachers"} />
                // </ProtectedComp>
              }
            />
            <Route
              path="/profile"
              element={
                // <ProtectedComp>
                  <Profile />
                // </ProtectedComp>
              }
            />
          </Routes>
        </GlobalProvider>
      </AuthProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
};

export default App;
