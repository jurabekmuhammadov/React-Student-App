import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../state/state-managment";
import PropTypes from "prop-types";
import "./modal.scss";
import closeLogo from "../../assets/close.svg";
const Modal = ({ selectedStudent, isModalOpen, closeModal }) => {
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

  const handleSubmit = () => {
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
    closeModal();
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value.trim() });
  };
  return (
    <div id="modal" className={`${isModalOpen ? "modal-open" : "modal-close"}`}>
      <form onSubmit={handleSubmit}>
        <div className="firstname">
          <label htmlFor="firstname">First name *</label>
          <input
            id="firstname"
            type="text"
            name="firstname"
            value={student.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="lastname">
          <label htmlFor="lastname">Last name *</label>
          <input
            id="lastname"
            type="text"
            name="lastname"
            value={student.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="group">
          <label htmlFor="group">Group *</label>
          <input
            id="group"
            type="text"
            name="group"
            value={student.group}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit" type="submit">
          {student.id ? "Update changes" : "Add student"}
        </button>
        <button className="close" onClick={closeModal} type="button">
          <img src={closeLogo} alt="" />
        </button>
      </form>
    </div>
  );
};

Modal.propTypes = {
  selectedStudent: PropTypes.object,
  clearSelectedStudent: PropTypes.func,
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default Modal;
