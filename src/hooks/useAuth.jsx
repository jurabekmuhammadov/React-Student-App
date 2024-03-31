/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isNewUserAdded, setIsNewUserAdded] = useState(false);
  const [userFromServer, setUserFromServer] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const signUp = async (data) => {
    setUser(data);
    setIsNewUserAdded(true);
    navigate("/login");
  };

  const login = (userLogin) => {
    if (
      userLogin.username === userFromServer.username &&
      userLogin.password === userFromServer.password
    ) {
      navigate("/home");
      setLoggedIn(true);
    } else {
      console.log("User is not defined");
    }
  };

  const addUser = async () => {
    if (isNewUserAdded) {
      await axios
        .put("http://localhost:3000/user", user)
        .then(() => {
          setSignedUp(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
      setIsNewUserAdded(false);
    }
  };

  const logout = async () => {
    await axios.put("http://localhost:3000/user", {}).catch((err) => {
      console.log(err.message);
    });
    setLoggedIn(false);
    setSignedUp(false);
  };

  const getUserData = async () => {
    await axios
      .get("http://localhost:3000/user")
      .then((res) => {
        setUserFromServer(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getUserData();
  }, [userFromServer]);

  useEffect(() => {
    addUser();
  }, [isNewUserAdded]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        login,
        logout,
        userFromServer,
        setLoggedIn,
        loggedIn,
        setSignedUp,
        signedUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};
