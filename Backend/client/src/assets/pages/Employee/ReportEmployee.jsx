import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';
import { useReactToPrint } from 'react-to-print';

const ReportEmployee = React.forwardRef((props, ref) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const componentRef = useRef();

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:8090/employees')
            .then((response) => {
                setEmployees(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8090/searchEmployee?search=${searchQuery}`);
            setEmployees(response.data.data);
            setLoading(false);
            setError(null);
        } catch (error) {
            console.error("Error fetching employee:", error);
            setError("An error occurred while fetching the employee for the search query.");
            setLoading(false);
        }
    };

    const generatePDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Employee List',
        onAfterPrint: () => alert('Data saved in PDF'),
    });

    const applySearchFilter = (employee) => (
        employee.EmpID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredEmployee = employees.filter(applySearchFilter);

    return (
        <div ref={ref} className="report-container">
            <style>
                {`
                .report-container {
                    max-width: 960px;
                    margin: auto;
                    padding: 20px;
                    background-color: #fff;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                .report-container h1, .report-container table {
                    margin-bottom: 20px;
                }
                .search-bar {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }
                .search-bar input {
                    padding: 10px;
                    width: 300px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }
                .search-bar button {
                    background-color: #0056b3;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .search-bar button:hover {
                    background-color: #004494;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f4f4f4;
                }
                `}
            </style>
            <BackButton destination='/employees/allEmployee' />
            <div className="search-bar">
                <h1 className="text-3xl">Employee List</h1>
                <div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter search query"
                    />
                    <button onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <table ref={componentRef}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>EmpID</th>
                                <th>Employee Name</th>
                                <th>Role</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployee.map((employee, index) => (
                                <tr key={employee._id}>
                                    <td>{index + 1}</td>
                                    <td>{employee.EmpID}</td>
                                    <td>{employee.employeeName}</td>
                                    <td>{employee.role}</td>
                                    <td>{employee.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center items-center mt-8">
                        <button onClick={generatePDF}>
                            Generate PDF
                        </button>
                    </div>
                </>
            )}
        </div>
    );
});

export default ReportEmployee;
