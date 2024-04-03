import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { GlobalContext } from "../../state/state-managment";
import { useContext } from "react";
import deleteLogo from "../../assets/delete.svg";
import editLogo from "../../assets/edit.svg";
import Pagination from "../Pagination/Pagination";
import Top from "../Top/Top";
import Modal from "../Modal/Modal";

export default function Orders() {
  const { displayedTeachers, getTeachers, deleteTeacher } =
    useContext(GlobalContext);

  useEffect(() => {
    getTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
    <React.Fragment>
      <Top setIsModalOpen={setIsModalOpen} />
      <Modal
        selectedStudent={selectedStudent}
        clearSelectedStudent={clearSelectedStudent}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Firstname</TableCell>
            <TableCell>Lastname</TableCell>
            <TableCell>Group</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedTeachers.map((std, index) => (
            <TableRow key={index}>
              <TableCell>{std.firstname}</TableCell>
              <TableCell>{std.lastname}</TableCell>
              <TableCell>{std.group}</TableCell>
              <TableCell>{std.level}</TableCell>
              <TableCell>
                <button className="edit" onClick={() => openModal(std)}>
                  Edit
                  <img src={editLogo} alt="" />
                </button>
                <button
                  className="delete"
                  onClick={() => deleteTeacher(std.id)}
                >
                  Delete
                  <img src={deleteLogo} alt="" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination />
    </React.Fragment>
  );
}
