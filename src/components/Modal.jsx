import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../state/state-managment";
import PropTypes from "prop-types";
import "../sass/components/_modal.scss";

const Modal = ({ selectedStudent, clearSelectedStudent, isModalOpen }) => {
  const [student, setStudent] = useState({
    firstname: "",
    lastname: "",
    group: "",
  });
  const { addStudent, updateStudent } = useContext(GlobalContext);

  useEffect(() => {
    if (selectedStudent) {
      setStudent(selectedStudent);
    } else {
      setStudent({ firstname: "", lastname: "", group: "" });
    }
  }, [selectedStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (student.id) {
      updateStudent(student);
    } else {
      addStudent(student);
    }
    setStudent({
      firstname: "",
      lastname: "",
      group: "",
    });
    clearSelectedStudent();
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  return (
    <div id="modal" className={`${isModalOpen ? "modal-open" : "modal-close"}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          value={student.firstname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastname"
          value={student.lastname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="group"
          value={student.group}
          onChange={handleChange}
        />
        <button type="submit">
          {student.id ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
};

Modal.propTypes = {
  selectedStudent: PropTypes.object,
  clearSelectedStudent: PropTypes.func,
  isModalOpen: PropTypes.bool,
};

export default Modal;
