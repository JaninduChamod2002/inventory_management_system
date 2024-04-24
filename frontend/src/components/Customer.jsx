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
    

    <div>
    <button type="submit">Add Customer</button>
      
      <form onSubmit={handleSubmit}>
        <label>
          Customer ID:
          <input type="text" value={customerID} onChange={(e) => setCustomerID(e.target.value)} />
        </label> <br/><br/><br/><br/>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label><br/><br/><br/>
        <label>
          Contact No:
          <input type="text" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
        </label><br/><br/><br/><br/>
        <label>
          Purchase History:
          <input type="text" value={purchaseHistory} onChange={(e) => setPurchaseHistory(e.target.value)} />
        </label><br/><br/><br/><br/>
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label><br/><br/><br/><br/>
        <label>
          Date of Birth:
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </label><br/><br/><br/><br/>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Customer;
