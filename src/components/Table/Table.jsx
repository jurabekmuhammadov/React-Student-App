import { useContext, useEffect } from "react";
import { GlobalContext } from "../../state/state-managment";
import PropTypes from "prop-types";
import "./table.scss";
import deleteLogo from "../../assets/delete.svg";
import editLogo from "../../assets/edit.svg";

const Table = ({ openModal }) => {
  const { displayedStudents, getStudents, deleteStudent } =
    useContext(GlobalContext);
  useEffect(() => {
    getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <table id="student-list">
      <tr className="titles">
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Group</th>
        <th>Actions</th>
      </tr>
      {displayedStudents.map((student, index) => (
        <tr className="student" key={index}>
          <td className="firstname" data-cell="firstname">
            {student.firstname}
          </td>
          <td className="lastname" data-cell="lastname">
            {student.lastname}
          </td>
          <td className="group" data-cell="group">
            {student.group}
          </td>
          <td className="actions" data-cell="actions">
            <button className="edit" onClick={() => openModal(student)}>
              Edit
              <img src={editLogo} alt="" />
            </button>
            <button
              className="delete"
              onClick={() => deleteStudent(student.id)}
            >
              Delete
              <img src={deleteLogo} alt="" />
            </button>
          </td>
        </tr>
      ))}
    </table>
  );
};

Table.propTypes = {
  setSelectedStudent: PropTypes.func,
  openModal: PropTypes.func,
};

export default Table;
