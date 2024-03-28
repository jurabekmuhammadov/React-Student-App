/* eslint-disable no-unused-vars */
import axios from "axios";
import { useReducer, createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const initialState = {
  students: [],
  loading: false,
  error: null,
};
export const GlobalContext = createContext(initialState);

const globalReducer = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: "Something went wrong, please check the console for details",
      };
    case "PENDING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "SET_STUDENTS":
      return {
        ...state,
        students: action.payload,
        loading: false, // Set loading to false when data is loaded
      };
    case "ADD_STUDENT":
      return {
        ...state,
        students: [...state.students, action.payload],
        loading: false,
      };
    case "UPDATE_STUDENT":
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.id ? action.payload : student
        ),
        loading: false,
      };
    case "DELETE_STUDENT":
      return {
        ...state,
        students: state.students.filter(
          (student) => student.id !== action.payload
        ),
        loading: false,
      };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const perPage = 6;
  const [totalPages, setTotalPages] = useState(
    Math.ceil(state.students.length / perPage)
  );
  const multiplePages = totalPages > 1;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const getStudents = async () => {
    dispatch({ type: "PENDING" });
    await axios
      .get("http://localhost:3000/students")
      .then((res) => {
        dispatch({ type: "SET_STUDENTS", payload: res.data });
      })
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
  const filter = (e) => {
    setPage(1);
    setFilterValue(e.target.value);
  };
  const handlePage = (type) => {
    if (type === "prev" && page > 1) {
      setPage(page - 1);
    } else if (type === "next" && page < totalPages) {
      setPage(page + 1);
    }
  };
  const search = (e) => {
    setSearchValue(e.target.value.toLowerCase().trim());
  };

  useEffect(() => {
    const filtered =
      filterValue !== "all"
        ? state.students.filter((student) => student.group === filterValue)
        : state.students;
    const searchFiltered = filtered.filter(
      (student) =>
        student.firstname.toLowerCase().includes(searchValue) ||
        student.lastname.toLowerCase().includes(searchValue)
    );
    setFilteredProducts(searchFiltered);
    const totalFilteredPages = Math.ceil(
      filtered.length && searchFiltered.length / perPage
    );
    setPage(1);
    setTotalPages(totalFilteredPages);
  }, [state.students, filterValue, searchValue]);

  const displayedStudents = filteredProducts.slice(startIndex, endIndex);

  return (
    <GlobalContext.Provider
      value={{
        students: state.students,
        getStudents,
        addStudent,
        updateStudent,
        deleteStudent,
        handlePage,
        multiplePages,
        page,
        totalPages,
        setPage,
        displayedStudents,
        filter,
        search,
        loading: state.loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.element,
};
