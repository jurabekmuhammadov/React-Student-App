import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { AuthProvider } from "./hooks/useAuth";
import Login from "./pages/Login";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div>
          {location.href !== "http://localhost:5173/login" ? <Header /> : null}
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
