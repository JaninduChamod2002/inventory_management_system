import React, { useState } from 'react';
 
import "../styles/Cus.css";


function Customer() {
  // State variables to store customer data
  const [customerID, setCustomerID] = useState('');
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  


  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your code here to handle form submission (e.g., send data to backend)
    console.log('Form submitted');
  };

  return (
    

    <div ><br/>
      <h1>Add New Customer</h1>
    <button type="Add Customer">Add Customer</button><br/>
      <div className='container'>
      <form onSubmit={handleSubmit}>
  
        <label>
          Customer ID:
          <input type="text" value={customerID} onChange={(e) => setCustomerID(e.target.value)} />
        </label> <br/>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label><br/>
        <label>
          Contact No:
          <input type="text" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
        </label><br/>
        <label>
          Purchase History:
          <input type="text" value={purchaseHistory} onChange={(e) => setPurchaseHistory(e.target.value)} />
        </label><br/>
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label><br/>
        <label>
          Date of Birth:
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </label><br/><br/>
        
        <button type="submit">submit</button>
      </form>
      </div>
      
    </div>
  );
}

export default Customer;
