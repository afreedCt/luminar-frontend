import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updateEmployeeAPI } from "../Services/allAPI";
import Spinner from 'react-bootstrap/Spinner';

const EditEmployee = ({ getAllEMployees, employee }) => {
  //   console.log(employee);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEmployeeData({
      name: employee.name,
      email: employee.email,
      position: employee.position,
      department: employee.department,
      salary: employee.salary,
    });
  };
  const handleShow = () => setShow(true);

  const [loading, setLoading] = useState(false);
  const [EmployeeData, setEmployeeData] = useState({
    name: employee.name,
    email: employee.email,
    position: employee.position,
    department: employee.department,
    salary: employee.salary,
  });

  const handleUpdateEmployee = async () => {
    setLoading(true);
    const { name, email, position, department, salary } = EmployeeData;
    if (name && email && position && department && salary) {
      try {
        const res = await updateEmployeeAPI(employee._id, EmployeeData);
        console.log(res);
        if (res.status == 201) {
          handleClose();
          getAllEMployees();
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
        toast.error(error.message);
      }
    } else {
      setLoading(false);
      toast.warning("please fill all the fields");
    }
  };
  return (
    <div>
      <button onClick={handleShow} className="btn btn-primary">
        <i className="fa-solid fa-pencil"></i>
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            action=""
            className="d-flex flex-column gap-3 align-items-center"
          >
            <div className="form-div d-flex flex-column">
              <label htmlFor="">Name :</label>
              <input
                value={EmployeeData.name}
                onChange={(e) =>
                  setEmployeeData({ ...EmployeeData, name: e.target.value })
                }
                className="form-input"
                type="text"
              />
            </div>
            <div className="form-div d-flex flex-column">
              <label htmlFor="">Email :</label>
              <input
                value={EmployeeData.email}
                onChange={(e) =>
                  setEmployeeData({ ...EmployeeData, email: e.target.value })
                }
                className="form-input"
                type="email"
              />
            </div>
            <div className="form-div d-flex flex-column">
              <label htmlFor="">Position :</label>
              <input
                value={EmployeeData.position}
                onChange={(e) =>
                  setEmployeeData({ ...EmployeeData, position: e.target.value })
                }
                className="form-input"
                type="text"
              />
            </div>
            <div className="form-div d-flex flex-column">
              <label htmlFor="">Department :</label>
              <input
                value={EmployeeData.department}
                onChange={(e) =>
                  setEmployeeData({
                    ...EmployeeData,
                    department: e.target.value,
                  })
                }
                className="form-input"
                type="text"
              />
            </div>
            <div className="form-div d-flex flex-column">
              <label htmlFor="">Salary :</label>
              <input
                value={EmployeeData.salary}
                onChange={(e) =>
                  setEmployeeData({ ...EmployeeData, salary: e.target.value })
                }
                className="form-input"
                type="number"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {loading ? (
            <div>
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Button onClick={handleUpdateEmployee} variant="primary">
              Update
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditEmployee;
