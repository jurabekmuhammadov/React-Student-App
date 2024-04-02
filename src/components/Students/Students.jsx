import { useState } from "react";
import { GlobalProvider } from "../../state/state-managment";
import Modal from "../Modal/Modal";
import Table from "../Table/Table";
import Top from "../Top/Top";
import Pagination from "../Pagination/Pagination";
import "./student.scss";
// import { ToastContainer } from "react-toastify";

const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clearSelectedStudent = () => {
    setSelectedStudent(null);
  };

  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
    clearSelectedStudent();
  };

  return (
    <GlobalProvider>
      <>
        <div id="students" className="container">
          <Modal
            selectedStudent={selectedStudent}
            clearSelectedStudent={clearSelectedStudent}
            closeModal={closeModal}
            isModalOpen={isModalOpen}
          />
          <Top setIsModalOpen={setIsModalOpen} />
          <Table
            setSelectedStudent={setSelectedStudent}
            openModal={openModal}
          />
          <Pagination />
        </div>
      </>
    </GlobalProvider>
  );
};

export default Students;
