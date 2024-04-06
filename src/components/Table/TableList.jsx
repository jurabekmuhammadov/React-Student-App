import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../state/state-managment";
import { Table, Button } from "antd";
import deleteLogo from "../../assets/delete.svg";
import editLogo from "../../assets/edit.svg";
import Pagination from "../Pagination/Pagination";
import Top from "../Top/Top";
import Modal from "../Modal/Modal";
import "antd/dist/reset.css";
import "./table.scss";

export default function TableList() {
  const { displayedStudents, getStudents, deleteStudent } =
    useContext(GlobalContext);

  useEffect(() => {
    getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clearSelectedStudent = () => {
    setSelectedStudent(null);
  };

  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    clearSelectedStudent();
  };

  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, student) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={() => openModal(student)}
            style={{
              background: "#eaeaff",
              border: "none",
              borderRadius: "5px",
              color: "black",
            }}
          >
            Edit
            <img src={editLogo} alt="" />
          </Button>
          <Button
            onClick={() => deleteStudent(student.id)}
            style={{
              background: "#eaeaff",
              border: "none",
              borderRadius: "5px",
              color: "black",
            }}
          >
            Delete
            <img src={deleteLogo} alt="" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Top setIsModalOpen={setIsModalOpen} />
      <Modal
        selectedStudent={selectedStudent}
        clearSelectedStudent={clearSelectedStudent}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
      />
      <Table dataSource={displayedStudents} columns={columns} />
      <Pagination />
    </React.Fragment>
  );
}
