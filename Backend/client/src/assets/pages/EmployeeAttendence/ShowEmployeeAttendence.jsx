import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';

function ShowEmployeeAttendence() {
    const [employeesAttendence, setEmployeesAttendence] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchDate, setSearchDate] = useState('');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8090/EmployeeAttendence')
            .then((response) => {
                setEmployeesAttendence(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleSearch = () => {
        const filteredAttendence = employeesAttendence.filter((attendance) => {
            return (
                (searchName === '' || attendance.employeeName.toLowerCase().includes(searchName.toLowerCase())) &&
                (searchDate === '' || attendance.date.includes(searchDate))
            );
        });
        return filteredAttendence;
    };

    const filteredEmployeesAttendence = handleSearch();
    const employeeNames = [...new Set(employeesAttendence.map((attendance) => attendance.employeeName))];

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            padding: '20px'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333'
        },
        button: {
            backgroundColor: '#0056b3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 15px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginRight: '10px'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse'
        },
        th: {
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px 10px',
            border: '1px solid #dee2e6'
        },
        td: {
            textAlign: 'center',
            padding: '10px',
            border: '1px solid #dee2e6'
        },
        link: {
            color: '#007bff',
            textDecoration: 'none',
            padding: '5px 10px',
            border: '1px solid #007bff',
            borderRadius: '5px',
            display: 'inline-block'
        },
        inputSelect: {
            padding: '10px',
            margin: '0 10px 10px 0',
            borderRadius: '5px',
            border: '1px solid #ccc'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Employee Attendance List</h1>
                <div>
                    <button style={styles.button} onClick={() => window.location.href = '/EmployeeAttendence/create'}>
                        Add Employee Attendance
                    </button>
                    <button style={styles.button}onClick={() => window.location.href = '/EmployeeAttendence/reportEmployeeAttendence'}>
                        Report
                    </button>
                </div>
            </div>

            <div>
                <select
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    style={styles.inputSelect}
                >
                    <option value="">All Employees</option>
                    {employeeNames.map((name, index) => (
                        <option key={index} value={name}>{name}</option>
                    ))}
                </select>
                <input
                    type="month"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    style={styles.inputSelect}
                />
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>No</th>
                            <th style={styles.th}>EmpID</th>
                            <th style={styles.th}>Employee Name</th>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th}>InTime</th>
                            <th style={styles.th}>OutTime</th>
                            <th style={styles.th}>Worked Hours</th>
                            <th style={styles.th}>OT Hours</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployeesAttendence.map((attendance, index) => (
                            <tr key={attendance._id}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>{attendance.EmpID}</td>
                                <td style={styles.td}>{attendance.employeeName}</td>
                                <td style={styles.td}>{attendance.date}</td>
                                <td style={styles.td}>{attendance.InTime}</td>
                                <td style={styles.td}>{attendance.OutTime}</td>
                                <td style={styles.td}>{attendance.WorkingHours}</td>
                                <td style={styles.td}>{attendance.OThours}</td>
                                <td style={styles.td}>
                                    <Link to={`/EmployeeAttendence/edit/${attendance._id}`} style={styles.link}>Edit</Link>
                                    <Link to={`/EmployeeAttendence/delete/${attendance._id}`} style={styles.link}>Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ShowEmployeeAttendence;
