import React, { useState,useRef } from 'react';
import "../styles/updateCus.css";
import {useReactToPrint} from "react-to-print";





function Customer() {
  const [customers, setCustomers] = useState([]);
  const [customerID, setCustomerID] = useState('');
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({ 
    content: () => ComponentsRef.current,
    DocumentTitle:"Customer Report",
    onAfterPrint:()=>alert(' user Report Successfully Download !')});
 


  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      customerID,
      name,
      contactNo,
      purchaseHistory,
      address,
      dateOfBirth
    };
    setCustomers([...customers, newCustomer]); 
    // Clear input fields after submission
    setCustomerID('');
    setName('');
    setContactNo('');
    setPurchaseHistory('');
    setAddress('');
    setDateOfBirth('');
  };

  const handleDelete = (index) => {
    const updatedCustomers = [...customers];
    updatedCustomers.splice(index, 1);
    setCustomers(updatedCustomers);
  };

  return (
    <div>
        <h1>Customer Details</h1>
       
      <div className='container'>
        
        <form onSubmit={handleSubmit}>
          {/* Your form inputs */}
        </form>
       
      </div>
      <br />
      <div ref={ComponentsRef}>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Contact No</th>
            <th>Purchase History</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.customerID}</td>
              <td>{customer.name}</td>
              <td>{customer.contactNo}</td>
              <td>{customer.purchaseHistory}</td>
              <td>{customer.address}</td>
              <td>{customer.dateOfBirth}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
                {/* Update button implementation */}
               {/*<button onClick={() => handleUpdate(index)}>Update</button>*/}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div><br />
      <button onClick={handlePrint}>Download Report</button>
    </div>
  );
}

export default Customer;
