import banner from "../assets/profile-banner.png";
import editLogo from "../assets/edit-icon.svg";
import arrowLeft from "../assets/arrow-left.svg";
import logoutIcon from "../assets/logout.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Profile = () => {
  const [userFromServer, setUserFromServer] = useState({});
  const { submitEditChanges, logout } = useAuth();
  const [isDisabled, setIsDisabled] = useState(true);
  const [editDetails, setEditDetails] = useState({
    username: "",
    password: "",
    avatar: "",
  });

  const getUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user");
      setUserFromServer(response.data);
      setEditDetails({
        username: response.data.username,
        password: response.data.password,
        avatar: response.data.avatar,
      });
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    setIsDisabled(!isDisabled);
  };

  const submitChanges = () => {
    submitEditChanges(editDetails, setIsDisabled, getUserData);
  };

  if (userFromServer.username && userFromServer.password) {
    return (
      <div id="profile">
        <div className="container profile__container">
          <div className="back">
            <Link to={"/"}>
              {" "}
              <img src={arrowLeft} alt="" />
              Back
            </Link>
            <button onClick={logout}>
              <img src={logoutIcon} alt="" />
              Log out
            </button>
          </div>
          <div className="banner">
            <img className="bgc" src={banner} alt="" />
            <div className="avatar">
              <div className="left">
                <img src={userFromServer.avatar} alt={userFromServer.avatar} />
                <h1>{userFromServer.username}</h1>
              </div>
              <div className="right">
                <button
                  form="myForm"
                  className={`${isDisabled ? "display-btn" : "none"}`}
                  onClick={handleEdit}
                >
                  <img src={editLogo} alt="" />
                  <span>Edit details</span>
                </button>
                <button
                  className={`cancel-edit ${
                    isDisabled ? "none" : "display-btn"
                  }`}
                  onClick={handleEdit}
                >
                  <span>Cancel</span>
                </button>
                <button
                  className={`save-edit ${isDisabled ? "none" : "display-btn"}`}
                  onClick={submitChanges}
                  disabled={isDisabled}
                >
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
          <div className="details">
            <form id="myForm">
              <div className="username">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  disabled={isDisabled}
                  value={editDetails.username}
                  onChange={(e) =>
                    setEditDetails({
                      ...editDetails,
                      username: e.target.value.trim().toLowerCase(),
                    })
                  }
                />
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  disabled={isDisabled}
                  value={editDetails.password}
                  onChange={(e) =>
                    setEditDetails({
                      ...editDetails,
                      password: e.target.value.trim().toLowerCase(),
                    })
                  }
                />
              </div>
              <div className="user-avatar">
                <label htmlFor="avatar">Avatar</label>
                <input
                  type="text"
                  id="avatar"
                  disabled={isDisabled}
                  value={editDetails.avatar}
                  onChange={(e) =>
                    setEditDetails({
                      ...editDetails,
                      avatar: e.target.value.trim(),
                    })
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else if (!userFromServer.username && !userFromServer.password) {
    return null;
  }
};

export default Profile;
