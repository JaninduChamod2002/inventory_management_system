import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { Sidebar } from '../Sidebar'; // Make sure Sidebar is correctly imported and styled

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
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8090/searchEmployee?search=${searchQuery}`);
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
    setLoading(false);
  };

  const applySearchFilter = (employee) => (
    employee.EmpID.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEmployee = employees.filter(applySearchFilter);

  // Enhanced Styles for Interactive and Colorful Theme
  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#34495e', // General dark theme background
    },
    sidebar: {
      width: '250px',
      background: 'linear-gradient(to right, #D3D3D3, #C0C0C0)', // Vibrant gradient background
      color: '#ffffff',
      padding: '20px',
      boxShadow: '5px 0 10px rgba(0, 0, 0, 0.5)', // Subtle shadow for depth
    },
    contentArea: {
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
      color: '#ecf0f1', // Light grey text for readability
    },
    searchSection: {
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'flex-end',

    },
    inputContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
    input: {
      flexGrow: 1,
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#2c3e50', // Darker input field for contrast
      color: '#ffffff',
    },
    button: {
      padding: '8px 16px',
      backgroundColor: '#3498db', // Blue button for contrast
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginLeft: '10px',
      transition: 'background-color 0.3s', // Smooth transition for hover effect
      '&:hover': {
        backgroundColor: '#2980b9' // Darken button on hover for interactivity
      }
    },
    buttonGroup: {
      display: 'flex',
     
      marginTop: '10px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#2c3e50', // Dark background for table
    },
    th: {
      color: '#ffffff',
      backgroundColor: '#555',
      fontWeight: 'bold',
      padding: '10px',
      border: '1px solid #666',
    },
    td: {
      textAlign: 'center',
      padding: '10px',
      border: '1px solid #666',
      color: '#ffffff',
    },
    linkShow: {
 
      display: 'inline-block',
      backgroundColor: '#1abc9c',
      color: 'white',
      padding: '5px 10px',
      margin: '0 5px',
      borderRadius: '4px',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
    },
    linkEdit: {
      display: 'inline-block',
      backgroundColor: '#f1c40f',
      color: 'white',
      padding: '5px 10px',
      margin: '0 5px',
      borderRadius: '4px',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
    },
    linkDelete: {
      display: 'inline-block',
      backgroundColor: '#e74c3c',
      color: 'white',
      padding: '5px 10px',
      margin: '0 5px',
      borderRadius: '4px',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
      
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <Sidebar />
      </div>
      <div style={styles.contentArea}>
        <div style={styles.searchSection}>
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search employees"
              style={styles.input}
            />
            <button onClick={handleSearch} style={styles.button}>Search</button>
          </div>
          <div style={styles.buttonGroup}>
            <button style={styles.button} onClick={() => window.location.href = '/employees/create'}>Add Employee</button>
            <button style={styles.button} onClick={() => window.location.href = '/employees/reportEmployee'}>Report</button>
            <button style={styles.button} onClick={() => window.location.href = '/EmployeeAttendence/allEmployeeAttendence'}>Attendance</button>
          </div>
        </div>
        {loading ? <Spinner /> : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>No</th>
                <th style={styles.th}>EmpID</th>
                <th style={styles.th}>Employee Name</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployee.map((employee, index) => (
                <tr key={employee._id}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{employee.EmpID}</td>
                  <td style={styles.td}>{employee.employeeName}</td>
                  <td style={styles.td}>{employee.role}</td>
                  <td style={styles.td}>{employee.phone}</td>
                  <td style={styles.td}>
                  <Link to={`/employees/details/${employee._id}`} style={styles.linkShow}>Show</Link>
                    <Link to={`/employees/edit/${employee._id}`} style={styles.linkEdit}>Edit</Link>
                    <Link to={`/employees/delete/${employee._id}`} style={styles.linkDelete}>Delete</Link>
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
