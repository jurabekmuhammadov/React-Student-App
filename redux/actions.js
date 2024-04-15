import axios from "axios";
import {
  ADD_STUDENT,
  DELETE_STUDENT,
  SET_STUDENTS,
  UPDATE_STUDENT,
  ERROR,
  PENDING,
} from "./types";

export const setStudents = (students) => ({
  type: SET_STUDENTS,
  payload: students,
});

export const addStudent = (student) => ({
  type: ADD_STUDENT,
  payload: student,
});

export const deleteStudent = (studentId) => ({
  type: DELETE_STUDENT,
  payload: studentId,
});

export const updateStudent = (student) => ({
  type: UPDATE_STUDENT,
  payload: student,
});

export const setError = (error) => ({
  type: ERROR,
  payload: error,
});

export const setPending = () => ({
  type: PENDING,
});

export const fetchStudents = () => {
    return async (dispatch) => {
      dispatch(setPending());
      try {
        const res = await axios.get("http://localhost:3000/students");
        dispatch(setStudents(res.data));
      } catch (error) {
        dispatch(setError("Something went wrong, please check the console for details"));
      }
    };
  };
  

export const addStudentAsync = (student) => {
  return async (dispatch) => {
    dispatch(setPending());
    try {
      const res = await axios.post("http://localhost:3000/students", student);
      dispatch(addStudent(res.data));
    } catch (error) {
      dispatch(setError("Something went wrong, please check the console for details"));
    }
  };
};

export const updateStudentAsync = (student) => {
  return async (dispatch) => {
    dispatch(setPending());
    try {
      const res = await axios.put(`http://localhost:3000/students/${student.id}`, student);
      dispatch(updateStudent(res.data));
    } catch (error) {
      dispatch(setError("Something went wrong, please check the console for details"));
    }
  };
};

export const deleteStudentAsync = (id) => {
  return async (dispatch) => {
    dispatch(setPending());
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/students/${id}`);
        dispatch(deleteStudent(id));
      } catch (error) {
        dispatch(setError("Something went wrong, please check the console for details"));
      }
    }
  };
};
