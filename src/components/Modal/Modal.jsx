import { useContext, useEffect } from "react";
import { GlobalContext } from "../../state/state-managment";
import PropTypes from "prop-types";
import "./modal.scss";
import closeLogo from "../../assets/close.svg";
import { useForm } from "react-hook-form";

const Modal = ({ selectedStudent, isModalOpen, closeModal }) => {
  const { addStudent, updateStudent } = useContext(GlobalContext);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedStudent) {
      setValue("firstname", selectedStudent.firstname);
      setValue("lastname", selectedStudent.lastname);
      setValue("group", selectedStudent.group);
    } else {
      setValue("firstname", "");
      setValue("lastname", "");
      setValue("group", "");
    }
  }, [selectedStudent, setValue]);

  const onSubmit = (data) => {
    if (selectedStudent) {
      updateStudent({ ...data, id: selectedStudent.id });
    } else {
      addStudent(data);
    }
    setValue("firstname", "");
    setValue("lastname", "");
    setValue("group", "");
    closeModal();
  };

  const handleClose = () => {
    reset();
    closeModal();
  };

  return (
    <div id="modal" className={`${isModalOpen ? "modal-open" : "modal-close"}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="firstname">
          <label htmlFor="firstname">First name *</label>
          <input
            id="firstname"
            type="text"
            {...register("firstname", { required: "First name is required" })}
          />
          {errors.firstname && (
            <span className="error">{errors.firstname.message}</span>
          )}
        </div>
        <div className="lastname">
          <label htmlFor="lastname">Last name *</label>
          <input
            id="lastname"
            type="text"
            {...register("lastname", { required: "Last name is required" })}
          />
          {errors.lastname && (
            <span className="error">{errors.lastname.message}</span>
          )}
        </div>
        <div className="group">
          <label htmlFor="group">Group *</label>
          <input
            id="group"
            type="text"
            {...register("group", { required: "Group is required" })}
          />
          {errors.group && (
            <span className="error">{errors.group.message}</span>
          )}
        </div>
        <button className="submit" type="submit">
          {selectedStudent ? "Update changes" : "Add student"}
        </button>
        <button className="close" onClick={handleClose} type="button">
          <img src={closeLogo} alt="" />
        </button>
      </form>
    </div>
  );
};

Modal.propTypes = {
  selectedStudent: PropTypes.object,
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default Modal;
