/* eslint-disable no-unused-vars */
import axios from "axios";
import { useReducer, createContext } from "react";
import PropTypes from "prop-types";

const initialState = {
  students: [],
};
export const GlobalContext = createContext(initialState);

const globalReducer = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return {
        students: [],
        loading: false,
        eroor: "Something went wrong, go to console",
      };
    case "PENDING":
      return {
        loading: true,
        students: [],
        error: null,
      };
    case "SET_STUDENTS":
      return { ...state, students: action.payload };
    case "ADD_STUDENT":
      return { ...state, students: [...state.students, action.payload] };
    case "UPDATE_STUDENT":
      return {
        ...state,
        students: state.students.map((student) => {
          return student.id == action.payload.id ? action.payload : student;
        }),
      };
    case "DELETE_STUDENT":
      return {
        ...state,
        students: state.students.filter(
          (student) => student.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const getStudents = async () => {
    dispatch({ type: "PENDING" });
    await axios
      .get("http://localhost:3000/students")
      .then((res) => {
        dispatch({ type: "SET_STUDENTS", payload: res.data });
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        dispatch({ type: "ERROR" });
      });
  };
  const addStudent = async (student) => {
    dispatch({ type: "PENDING" });
    await axios
      .post("http://localhost:3000/students", student)
      .then((res) => {
        dispatch({ type: "ADD_STUDENT", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "ERROR" });
      });
  };

  const updateStudent = async (student) => {
    dispatch({ type: "PENDING" });
    await axios
      .put(`http://localhost:3000/students/${student.id}`, student)
      .then((res) => {
        dispatch({ type: "UPDATE_STUDENT", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "ERROR" });
      });
  };

  const deleteStudent = async (id) => {
    dispatch({ type: "PENDING" });
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmDelete) {
      await axios
        .delete(`http://localhost:3000/students/${id}`)
        .then(() => {
          dispatch({ type: "DELETE_STUDENT", payload: id });
        })
        .catch((err) => {
          dispatch({ type: "ERROR" });
        });
    } else {
      window.alert("Deleting canceled!!!");
    }
    getStudents();
  };

  return (
    <GlobalContext.Provider
      value={{
        students: state.students,
        getStudents,
        addStudent,
        updateStudent,
        deleteStudent,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.element,
};
