import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/returnStyle/Showreturn.css';

function AddReturn() {
  const [returns, setReturns] = useState([]);
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
      const newReturn = response.data;
      setReturns([...returns, newReturn]);
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

  const handleDelete = (index) => {
    const updatedReturns = [...returns];
    updatedReturns.splice(index, 1);
    setReturns(updatedReturns);
  };

  return (
    <div className="container">
      <h2>Add Return</h2>
      <form onSubmit={handleSubmit}>
        {/* Your form inputs */}
      </form>
      <table className="return-table">
        <thead>
          <tr>
            <th>Return ID</th>
            <th>Return Date</th>
            <th>Return Item Name</th>
            <th>Reason</th>
            <th>Customer Name</th>
            <th>Customer Address</th>
            <th>Customer Phone</th>
            <th>Return Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {returns.map((ret, index) => (
            <tr key={index}>
              <td>{ret.returnID}</td>
              <td>{ret.returnDate}</td>
              <td>{ret.returnItemN}</td>
              <td>{ret.reason}</td>
              <td>{ret.customerDetails.name}</td>
              <td>{ret.customerDetails.cAddress}</td>
              <td>{ret.customerDetails.phoneNO}</td>
              <td>{ret.rStatus}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
                {/* Update button implementation */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddReturn;
