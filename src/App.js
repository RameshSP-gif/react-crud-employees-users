import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = 'https://backendexpress-production.up.railway.app/api';

function App() {
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '' });

  // Fetch data
  useEffect(() => {
    fetchUsers();
    fetchEmployees();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(`${api}/users`);
    setUsers(res.data);
  };

  const fetchEmployees = async () => {
    const res = await axios.get(`${api}/employees`);
    setEmployees(res.data);
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${api}/users`, newUser);
    setNewUser({ name: '', email: '' });
    fetchUsers();
  };

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${api}/employees`, newEmployee);
    setNewEmployee({ name: '', position: '' });
    fetchEmployees();
  };

  const deleteUser = async (id) => {
    await axios.delete(`${api}/users/${id}`);
    fetchUsers();
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`${api}/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🚀 Railway Express CRUD (Users + Employees)</h1>

      {/* Users */}
      <h2>Users</h2>
      <form onSubmit={handleUserSubmit}>
        <input
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => deleteUser(user.id)}>❌</button>
          </li>
        ))}
      </ul>

      {/* Employees */}
      <h2>Employees</h2>
      <form onSubmit={handleEmployeeSubmit}>
        <input
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
          placeholder="Position"
          value={newEmployee.position}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
        />
        <button type="submit">Add Employee</button>
      </form>

      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} - {emp.position}
            <button onClick={() => deleteEmployee(emp.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
