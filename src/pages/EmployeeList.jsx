import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EditEmployee from "./EditEmployee";
import { toast } from "react-toastify";
import { addEmployeeAPI, deleteEmployeeAPI, getAllEmployeeAPI } from "../Services/allAPI";
import Spinner from 'react-bootstrap/Spinner';

const EmployeeList = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEmployeeData({
      name: "",
      email: "",
      position: "",
      department: "",
      salary: "",
    });
  };
  const handleShow = () => setShow(true);

  const handleDeleteModalClose=()=>{
    setDeleteShow(false)
    setEmployeeId("")
  }
  const handleDeleteModalShow=()=>{
    setDeleteShow(true)
  }

  const [deleteLoading,setDeleteLoading]=useState(false)
  const [searchKey,setSearchKey]=useState("")

  const [employeeId,setEmployeeId]=useState("")
  const [EmployeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    salary: "",
  });

  const [employeeDummy,setEmployeeSummy]=useState([])

  const [allEmployees, setAllEmployees] = useState([]);
//   console.log(allEmployees);

  const [addLoading,setAddLoading]=useState(false)

  const [deleteShow,setDeleteShow]=useState(false)

  useEffect(() => {
    getAllEMployees();
  }, []);

  const getAllEMployees = async () => {
    try {
      const res = await getAllEmployeeAPI();
      // console.log(res)
      setAllEmployees(res.data);
    //   allEmployeesDummy=res.data
      setEmployeeSummy(res.data)
    } catch (error) {
      toast.error(error.message);
      console.log("error to get all data : ", error);
    }
  };

  const handleAddEmployee = async () => {
    setAddLoading(true)
    const { name, email, position, department, salary } = EmployeeData;
    if (name && email && position && department && salary) {
        try {
            const res = await addEmployeeAPI(EmployeeData);
            console.log(res);
            if (res.status == 201) {
                toast.success("Employee Added succesfully");
                handleClose();
                getAllEMployees();
            }
            setAddLoading(false)
        } catch (error) {
          setAddLoading(false)
          toast.error(error.message);
          console.log("error to add employee : ", error.message);
        }
    } else {
        setAddLoading(false)
      toast.warning("please fill all the fields");
    }
  };

  const handleDeleteEmployee=async()=>{
    // console.log(employeeId)
    setDeleteLoading(true)
    
    try {
        const res=await deleteEmployeeAPI(employeeId)
        if(res.status==201){
            toast.success("Employee deleted successfully")
            getAllEMployees()
            handleDeleteModalClose()
        }
        setDeleteLoading(false)
    } catch (error) {
        setDeleteLoading(false)
        toast.error(error.message)
    }
  }

  const handleSearch=(e)=>{
    const search=e.target.value
    if(search!=""){
        setAllEmployees(prev=>prev.filter((item)=>item?.name.toLowerCase().includes(search.toLowerCase()) || item?.department.toLowerCase().includes(search.toLowerCase()) || item?.position.toLowerCase().includes(search.toLowerCase())))
    }else{
        setAllEmployees(employeeDummy)
        // console.log("changed",employeeDummy,allEmployees)
        
    }
  }
  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between my-3 flex-wrap">
          <button
            onClick={handleShow}
            className="btn btn-secondary rounded-2 fw-bold"
          >
            <i className="fa-solid fa-plus pe-1"></i>Add Employee
          </button>
          <h1 className="fw-bold">Employee List</h1>
          <input
            type="search"
            onChange={(e)=>{setSearchKey(e.target.value);handleSearch(e)}}
            className="ps-2 rounded-3"
            placeholder="Search by name/position/department"
          />
        </div>
        {allEmployees?.length > 0 ? (
          // <div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th>Department</th>
                <th>Salary</th>
                <th>DateOfJoining</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allEmployees.map((item,index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.position}</td>
                  <td>{item.department}</td>
                  <td>{item.salary}</td>
                  <td>{new Date(item.dateOfJoining).toLocaleDateString()}</td>
                  <td className="d-flex gap-2">
                    <EditEmployee getAllEMployees={getAllEMployees} employee={item} />
                    <button onClick={()=>{
                        handleDeleteModalShow();
                        setEmployeeId(item._id)
                    }
                        } className="btn btn-danger">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          // </div>
          <div>No Employees Listed</div>
        )}
      </div>

      {/* MODAL */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            action=""
            className="d-flex flex-wrap justify-content-center gap-3 align-items-center"
          >
            <div className="form-div d-flex flex-column">
              <label htmlFor="">Name :</label>
              <input
                value={EmployeeData.name}
                onChange={(e) =>
                  setEmployeeData({ ...EmployeeData, name: e.target.value })
                }
                required
                placeholder="Enter name"
                className="form-input"
                type="text"
              />
            </div>
            <div className="form-div d-flex flex-column">
              <label className="fw-bold" htmlFor="">Email :</label>
              <input
                value={EmployeeData.email}
                onChange={(e) =>
                  setEmployeeData({ ...EmployeeData, email: e.target.value })
                }
                required
                placeholder="Enter email"
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
                required
                placeholder="Enter position"
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
                required
                placeholder="Enter department"
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
                required
                placeholder="Enter salary"
                className="form-input"
                type="number"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {
            addLoading?
            <div><Spinner animation="border" variant="primary" /></div>
            :
          <Button variant="primary" onClick={handleAddEmployee}>
            Create
          </Button>
          }
        </Modal.Footer>
      </Modal>

      {/* deleet modal */}
      <Modal
        show={deleteShow}
        onHide={handleDeleteModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <h1>Do you want to delet this employee ? </h1>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          {
            deleteLoading?
            <div><Spinner animation="border" variant="danger" /></div>
            :
          <Button variant="danger" onClick={handleDeleteEmployee}>
            Delete
          </Button>

          }
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmployeeList;
