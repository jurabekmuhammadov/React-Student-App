import { useState } from "react";
import { GlobalProvider } from "../state/state-managment";
import Modal from "./Modal";
import Table from "./Table";

const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const clearSelectedStudent = () => {
    setSelectedStudent(null);
  };
  const [isModalOpen, setModal] = useState(true);
  return (
    <GlobalProvider>
      <div id="students">
        <Modal
          selectedStudent={selectedStudent}
          clearSelectedStudent={clearSelectedStudent}
        />
        <hr />
        <Table
          isModalOpen={isModalOpen}
          setSelectedStudent={setSelectedStudent}
        />
      </div>
    </GlobalProvider>
  );
};

export default Students;
