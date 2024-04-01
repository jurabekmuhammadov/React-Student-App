/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import defaultAvatar from "../assets/avatar.webp";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isNewUserAdded, setIsNewUserAdded] = useState(false);
  const [userFromServer, setUserFromServer] = useState({});

  const notifyLoggedIn = () => toast.success("You are successfully logged in!");
  const notifySignedUp = () => toast.success("You are successfully signed up!");
  const notifyErrorSignedUp = (error) => toast.success(error);
  const notifyErrorLoggedIn = () => toast.error("No user found!");
  const notifyUpdatedDetails = () => toast.success("Details updated!");
  const notifyErrorUpdatedDetails = (error) => toast.success(error);
  const notifyLoggedOut = () => toast.warning("You are logged out!");
  const notifyErrorLoggedOut = (error) => toast.success(error);

  const signUp = async (data) => {
    setUser(data);
    setIsNewUserAdded(true);
    navigate("/login");
  };

  const login = async (userLogin) => {
    if (
      userLogin.username.toLowerCase() ===
        userFromServer.username.toLowerCase() &&
      userLogin.password.toLowerCase() === userFromServer.password.toLowerCase()
    ) {
      notifyLoggedIn();
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
      notifyErrorLoggedIn();
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
        .then(() => {
          notifySignedUp();
        })
        .catch((error) => {
          notifyErrorSignedUp(error);
        });
      setIsNewUserAdded(false);
    }
  };

  const logout = async () => {
    await axios
      .put("http://localhost:3000/user", {})
      .then(() => {
        notifyLoggedOut();
      })
      .catch((error) => {
        notifyErrorLoggedOut(error);
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
      notifyUpdatedDetails();
    } catch (error) {
      notifyErrorUpdatedDetails(error);
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
        notifyUpdatedDetails
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
