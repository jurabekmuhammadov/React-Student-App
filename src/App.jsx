import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { AuthProvider } from "./hooks/useAuth";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedComp from "./components/ProtectedComp/ProtectedComp";
import { GlobalProvider } from "./state/state-managment";
import Teachers from "./pages/Teachers";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalProvider>
          <div>
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/home"
                element={
                  <ProtectedComp>
                    <Home />
                  </ProtectedComp>
                }
              />
              <Route
                path="/teachers"
                element={
                  <ProtectedComp>
                    <Teachers />
                  </ProtectedComp>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedComp>
                    <Profile />
                  </ProtectedComp>
                }
              />
            </Routes>
          </div>
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
