import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [employees, setEmployees] = useState([]);

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    const response = await axios.get("http://localhost:8080/api/employees");
    setEmployees(response.data);
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const saveEmployee = async () => {

    if (editingId) {

      await axios.put(
        `http://localhost:8080/api/employees/${editingId}`,
        employee
      );

      setEditingId(null);

    } else {

      await axios.post(
        "http://localhost:8080/api/employees",
        employee
      );
    }

    setEmployee({
      firstName: "",
      lastName: "",
      email: ""
    });

    getEmployees();
  };

  const editEmployee = (emp) => {

    setEmployee({
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email
    });

    setEditingId(emp.id);
  };

  const deleteEmployee = async (id) => {

    await axios.delete(
      `http://localhost:8080/api/employees/${id}`
    );

    getEmployees();
  };

  const cancelEdit = () => {

    setEmployee({
      firstName: "",
      lastName: "",
      email: ""
    });

    setEditingId(null);
  };

  return (
    <div className="container">

      <h1 className="title">
        Employee Management System
      </h1>

      <div className="form-container">

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={employee.firstName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={employee.lastName}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
        />

        <div className="button-group">

          <button
            className="add-btn"
            onClick={saveEmployee}
          >
            {editingId ? "Update Employee" : "Add Employee"}
          </button>

          {
            editingId && (
              <button
                className="cancel-btn"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )
          }

        </div>

      </div>

      <div className="employee-grid">

        {
          employees.map((emp) => (

            <div
              className="employee-card"
              key={emp.id}
            >

              <h2 className="employee-name">
                {emp.firstName} {emp.lastName}
              </h2>

              <p>{emp.email}</p>

              <div className="card-buttons">

                <button
                  className="edit-btn"
                  onClick={() => editEmployee(emp)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteEmployee(emp.id)}
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default App;