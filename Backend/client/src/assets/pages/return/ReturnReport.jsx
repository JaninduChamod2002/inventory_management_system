import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

function ReturnReport() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/order");
      console.log("Response data:", response.data); // This will show the entire response object
      setOrders(response.data.orders); // Accessing the 'orders' array from the response data
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Set orders to an empty array in case of error
      setOrders([]);
    }
  };

  const componentsRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "Monthly Order Report",
    onAfterPrint: () => alert("Monthly Order Report Successfully Printed!"),
  });

  return (
    <div className="container"><br/>
      <h3>Return Report</h3><br/>
      <div ref={componentsRef}>
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Supplier</th>
              <th>Order Date</th>
              <th>Required Date</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderID}</td>
                <td>{order.supplier}</td>
                <td>{order.orderDate}</td>
                <td>{order.requiredDate}</td>
                <td>
                  <ul>
                    {order.Items.map((item, index) => (
                      <li key={index}>
                        {item.name} - {item.quantity} - ${item.price}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <button className="btn btn-primary mb-3" onClick={handlePrint}>
        Generate Report
      </button>
    </div>
  );
}

export default ReturnReport;