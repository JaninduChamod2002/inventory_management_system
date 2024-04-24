import React, { useState } from 'react';
import axios from 'axios'; // You may need to install axios for handling API requests
import "../../styles/returnStyle/Addreturn.css"; // Import the CSS file

function AddReturn() {
  const [returnID, setReturnID] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnItemN, setReturnItemN] = useState('');
  const [reason, setReason] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [returnStatus, setReturnStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend API to save the return data
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
      console.log(response.data); // Handle response from the server as needed
      // Clear form fields after successful submission
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
      // Handle error as needed
    }
  };

  return (
    <div className="form-container">
      <h2>Add Return</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Return ID:</label>
          <input type="text" value={returnID} onChange={(e) => setReturnID(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Return Date:</label>
          <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Return Item Name:</label>
          <input type="text" value={returnItemN} onChange={(e) => setReturnItemN(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Reason:</label>
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Customer Name:</label>
          <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Customer Address:</label>
          <input type="text" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Customer Phone:</label>
          <input type="text" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Return Status:</label>
          <input type="text" value={returnStatus} onChange={(e) => setReturnStatus(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddReturn;
