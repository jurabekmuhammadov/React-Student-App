import { useContext, useEffect } from "react";
import { GlobalContext } from "../state/state-managment";
import PropTypes from "prop-types";

const Table = ({ setSelectedStudent }) => {
  const { students, getStudents, deleteStudent } = useContext(GlobalContext);
  useEffect(() => {
    getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {students.map((student) => (
        <div key={student.id}>
          <span>{student.firstname}</span>
          <span>{student.lastname}</span>
          <span>{student.group}</span>
          <button onClick={() => setSelectedStudent(student)}>Edit</button>
          <button onClick={() => deleteStudent(student.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

Table.propTypes = {
  setSelectedStudent: PropTypes.func,
};

export default Table;
