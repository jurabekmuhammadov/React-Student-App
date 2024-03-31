/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import defaultAvatar from "../assets/avatar.webp";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isNewUserAdded, setIsNewUserAdded] = useState(false);
  const [userFromServer, setUserFromServer] = useState({});

  const signUp = async (data) => {
    setUser(data);
    setIsNewUserAdded(true);
    navigate("/login");
  };

  const login = async (userLogin) => {
    if (
      userLogin.username === userFromServer.username &&
      userLogin.password === userFromServer.password
    ) {
      await axios
        .put("http://localhost:3000/user", {
          ...userFromServer,
          isLoggedIn: true,
        })
        .catch((err) => {
          console.log(err.message);
        });
      navigate("/home");
    } else {
      console.log("User is not defined");
    }
  };

  const addUser = async () => {
    if (isNewUserAdded) {
      await axios
        .put("http://localhost:3000/user", {
          ...user,
          avatar: defaultAvatar,
          isSignedUp: true,
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
    navigate("/");
  };

  const submitEditChanges = async (editDetails, setIsDisabled, getUserData) => {
    try {
      const updatedUserData = {
        ...userFromServer,
        username: editDetails.username,
        password: editDetails.password,
        avatar: editDetails.avatar,
      };

      await axios
        .put("http://localhost:3000/user", updatedUserData)
        .then((response) => {
          setUserFromServer(response.data);
          getUserData();
        });

      setIsDisabled(true);
    } catch (error) {
      console.error("Error updating user data:", error.message);
    }
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
        submitEditChanges,
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
