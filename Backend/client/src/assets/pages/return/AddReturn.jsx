import React, { useState } from 'react';
import axios from 'axios'; 
import "../../styles/returnStyle/Addreturn.css"; 
import "../../styles/returnStyle/sidebar.css"; 

function AddReturn() {
  const [returnID, setReturnID] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnItemN, setReturnItemN] = useState('');
  const [reason, setReason] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [returnStatus, setReturnStatus] = useState('');
  const [formValid, setFormValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8090/return/add', {
        returnID,
        returnDate,
        returnItemN,
        reason,
        customerDetails: {
          name: customerName,
          cAddress: customerAddress,
          phoneNO: customerPhone
        },
        rStatus: returnStatus
      });
      console.log(response.data); 
      setFormValid(true); // Set form as valid
      setTimeout(() => {
        setFormValid(false); // Reset form validity after 3 seconds
      }, 3000);
      setReturnID('');
      setReturnDate('');
      setReturnItemN('');
      setReason('');
      setCustomerName('');
      setCustomerAddress('');
      setCustomerPhone('');
      setReturnStatus('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Sidebar</h2>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Return Update</a></li>
          <li><a href="#">Return Delete</a></li>
          <li><a href="#">Return Reports</a></li>
          <li><a href="#">Database</a></li>
        </ul>
      </div>
      <div className="main-content">
        <div className="form-container">
          <h2>Add Return Item</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Return ID:</label>
              <input type="text" value={returnID} onChange={(e) => setReturnID(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Return Date:</label>
              <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Return Item Name:</label>
              <input type="text" value={returnItemN} onChange={(e) => setReturnItemN(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Reason:</label>
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Customer Name:</label>
              <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Customer Address:</label>
              <input type="text" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Customer Phone:</label>
              <input type="text" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Return Status:</label>
              <input type="text" value={returnStatus} onChange={(e) => setReturnStatus(e.target.value)} required />
            </div>
            <div className="form-group">
              <button className="submit-button" type="submit">Submit</button>
              {formValid && <p className="valid-message">Form submitted successfully!</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddReturn;
