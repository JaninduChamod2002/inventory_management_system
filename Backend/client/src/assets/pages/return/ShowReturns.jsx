import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component
import '../../styles/returnStyle/Showreturn.css';


function ShowReturns() {
  const [returns, setReturns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      const response = await axios.get("http://localhost:8090/return/");
      console.log("Response data:", response.data);
      setReturns(response.data.returnData); // Correct the property name here
    } catch (error) {
      console.error("Error fetching returns:", error);
      setReturns([]);
    }
  };
  /*const deleteReturn = async (id) => {
    try {
      await axios.delete(http://localhost:8090/api/order/delete/${id});
      // Filter out the deleted order from the local state
      const updatedOrders = orders.filter((order) => order.orderID !== id);
      setOrders(updatedOrders);
      console.log("Order deleted successfully");
      alert("Order deleted successfully"); // Display alert message
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Error deleting order"); // Display error message
    }
  };*/
  

  // Filter returns based on search term
  const filteredReturns = returns.filter(
    ret => 
      ret.returnID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ret.returnDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ret.returnItemN.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ret.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ret.customerDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ret.customerDetails.cAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ret.customerDetails.phoneNO.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ret.rStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (index) => {
    const updatedReturns = [...returns];
    updatedReturns.splice(index, 1);
    setReturns(updatedReturns);
  };

  return (
    <div className="container">
      <h2>Show Returns</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
          {filteredReturns.map((ret, index) => (
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
              <Link to={`/update/${ret.returnID}`} className="btn btn-primary btn-sm me-2">
        Update
      </Link>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowReturns;

