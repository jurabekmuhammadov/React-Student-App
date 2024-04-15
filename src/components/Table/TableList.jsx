import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Table, Button } from "antd";
import deleteLogo from "../../assets/delete.svg";
import editLogo from "../../assets/edit.svg";
import Pagination from "../Pagination/Pagination";
import Top from "../Top/Top";
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";
import { fetchStudents, deleteStudent } from '../../../redux/actions';

function TableList(props) {
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
            onClick={() => props.deleteStudent(student.id)}
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

  useEffect(() => {
    props.fetchStudents();
  }, []);

  if (props.loading) {
    return <p>Loading students...</p>;
  }

  return (
    <React.Fragment>
      <Top setIsModalOpen={setIsModalOpen} />
      <Modal
        selectedStudent={selectedStudent}
        clearSelectedStudent={clearSelectedStudent}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
      />
      <Table dataSource={props.students} columns={columns} />
      <Pagination />
    </React.Fragment>
  );
}

TableList.propTypes = {
  fetchStudents: PropTypes.func.isRequired,
  deleteStudent: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  students: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  students: state.students,
});

export default connect(mapStateToProps, { fetchStudents, deleteStudent })(TableList);
