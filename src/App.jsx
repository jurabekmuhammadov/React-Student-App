import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from "../redux/store";
// import SignUp from "./pages/SignUp";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
import TableList from "./components/Table/TableList";
// import AntSidebar from "./components/AntComponents/AntDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          {/* <Route path="/" element={<SignUp />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/" element={<TableList />} />
          {/* <Route path="/teachers" element={<AntSidebar title="Teachers" />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
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
      </Provider>
    </BrowserRouter>
  );
};

export default App;
