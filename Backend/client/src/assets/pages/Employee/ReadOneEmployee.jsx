import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { Sidebar } from '../Sidebar'; // Ensure the Sidebar is imported correctly

const ReadOneEmployee = () => {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8090/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4', // Light gray background for the whole page
  };

  const contentStyle = {
    flex: 1,
    padding: '24px',
    marginTop: '20px',
  };

  const formStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    backgroundColor: '#ffffff', // White background for the form
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Subtle shadow for the form
  };

  const detailStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0', // Vertical padding for better spacing
  };

  const labelStyle = {
    fontWeight: '600',
    marginRight: '8px',
    minWidth: '150px', // Ensuring labels have enough space
    color: '#333', // Dark grey color for text for better readability
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={contentStyle}>
        <BackButton destination='/employees/allEmployee' />
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>Employee Details</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div style={formStyle}>
            <div style={detailStyle}>
              <span style={labelStyle}>Emp ID:</span>
              <span>{employee.EmpID}</span>
            </div>
            <div style={detailStyle}>
              <span style={labelStyle}>Employee Name:</span>
              <span>{employee.employeeName}</span>
            </div>
            <div style={detailStyle}>
              <span style={labelStyle}>Role:</span>
              <span>{employee.role}</span>
            </div>
            <div style={detailStyle}>
              <span style={labelStyle}>Phone:</span>
              <span>{employee.phone}</span>
            </div>
            <div style={detailStyle}>
              <span style={labelStyle}>Password:</span>
              <span>{employee.password}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadOneEmployee;
