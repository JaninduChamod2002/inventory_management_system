import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { Sidebar } from '../Sidebar'; // Ensure the Sidebar is correctly imported and styled

function ShowEmployee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8090/employees');
      setEmployees(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8090/searchEmployee?search=${searchQuery}`);
      setEmployees(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employee:', error);
      setLoading(false);
    }
  };

  const applySearchFilter = (employee) => (
    employee.EmpID.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEmployee = employees.filter(applySearchFilter);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Sidebar />
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employees"
            style={{ flexGrow: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '10px' }}
          />
          <button style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>Search</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button onClick={() => window.location.href='/employees/create'} style={{ padding: '8px 16px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', marginRight: '10px'  }}>Add Employee</button>
          <button onClick={() => window.location.href='/employees/reportEmployee'} style={{ padding: '8px 16px', backgroundColor: '#9b59b6', color: 'white', border: 'none', borderRadius: '4px', marginRight: '10px' }}>Report</button>
          <button onClick={() => window.location.href='/EmployeeAttendence/allEmployeeAttendence'} style={{ padding: '8px 16px', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '4px' }}>Attendance</button>
        </div>
        {loading ? <Spinner /> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', border: '1px solid #ddd' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px', color: '#333', backgroundColor: '#e8e8e8' }}>No</th>
                <th style={{ padding: '10px', color: '#333', backgroundColor: '#e8e8e8' }}>EmpID</th>
                <th style={{ padding: '10px', color: '#333', backgroundColor: '#e8e8e8' }}>Employee Name</th>
                <th style={{ padding: '10px', color: '#333', backgroundColor: '#e8e8e8' }}>Role</th>
                <th style={{ padding: '10px', color: '#333', backgroundColor: '#e8e8e8' }}>Phone</th>
                <th style={{ padding: '10px', color: '#333', backgroundColor: '#e8e8e8' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployee.map((employee, index) => (
                <tr key={employee._id}>
                  <td style={{ textAlign: 'center', padding: '10px', border: '1px solid #ddd' }}>{index + 1}</td>
                  <td style={{ textAlign: 'center', padding: '10px', border: '1px solid #ddd' }}>{employee.EmpID}</td>
                  <td style={{ textAlign: 'center', padding: '10px', border: '1px solid #ddd' }}>{employee.employeeName}</td>
                  <td style={{ textAlign: 'center', padding: '10px', border: '1px solid #ddd' }}>{employee.role}</td>
                  <td style={{ textAlign: 'center', padding: '10px', border: '1px solid #ddd' }}>{employee.phone}</td>
                  <td style={{ textAlign: 'center', padding: '10px', border: '1px solid #ddd' }}>
                    <Link to={`/employees/details/${employee._id}`} style={{ padding: '5px 10px', backgroundColor: '#2ecc71', color: 'white', borderRadius: '4px', textDecoration: 'none', marginRight: '5px' }}>Show</Link>
                    <Link to={`/employees/edit/${employee._id}`} style={{ padding: '5px 10px', backgroundColor: '#f39c12', color: 'white', borderRadius: '4px', textDecoration: 'none', marginRight: '5px' }}>Edit</Link>
                    <Link to={`/employees/delete/${employee._id}`} style={{ padding: '5px 10px', backgroundColor: '#e74c3c', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>Delete</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ShowEmployee;
