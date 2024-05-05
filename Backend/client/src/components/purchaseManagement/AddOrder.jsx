import React,{useState} from "react";
import axios from "axios";


export default function AddOrder(){

  const [orderID, setOrderID] = useState("");
  const [supplier, setSupplier] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [requiredDate, setRequiredDate] = useState("");
  const [Items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [price, setPrice] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

    // Function to add a new item
    const addItem = () => {
        const newItem = {
          name: itemName,
          quantity: parseInt(quantity),
          price: parseFloat(price),
        };
    
        const updatedItems = [...Items, newItem];
        setItems(updatedItems);
    
        // Calculate total amount
        const total = updatedItems.reduce((acc, item) => {
          return acc + item.quantity * item.price;
        }, 0);
        setTotalAmount(total);
    
        // Clear input fields after adding
        setItemName("");
        setQuantity("1");
        setPrice("");
      };
    
      // Function to remove an item
      const removeItem = (index) => {
        const updatedItems = [...Items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    
        // Recalculate total amount
        const total = updatedItems.reduce((acc, item) => {
          return acc + item.quantity * item.price;
        }, 0);
        setTotalAmount(total);
      };

    function sendData(e){

        e.preventDefault();

        const newOrder={
          orderID,
          supplier,
          orderDate,
          requiredDate,
          Items,
    
        }
        axios.post("http://localhost:8090/api/order/add",newOrder).then(()=>{
            alert("order Added");
            
            setOrderID("");
            setSupplier("");
            setOrderDate("");
            setRequiredDate("");
            setItems([]);
            setItemName("");
            setQuantity("1");
            setPrice("");
            setTotalAmount(0);

        }).catch((err)=>{
            alert(err)
        })
        
    }
    
    return(
        <div className="container" ><br/>
        <h3><u>Add New Order</u></h3><br/>
        <div className="container my-4 p-4 rounded" style={{ backgroundColor: "#E3E5E7" }}>
        <form onSubmit={sendData}>
            <div className="row">
            <div className="mb-3 col-lg-6 col-md col-12">
            <label htmlFor="orderId" className="form-label">Order ID:</label>

                <input type="text" className="form-control" id="orderId" 
                onChange={(e)=>{

                  setOrderID(e.target.value) ;

                }}/>
            </div>

            <div className="mb-3 col-lg-6 col-md col-12">
                <label htmlFor="supplierName" className="form-label">supplier Name: </label>
                <input type="text" className="form-control" id="supName"
                onChange={(e)=>{

                  setSupplier(e.target.value) ;
                    
                 }}/>
            </div>

            <div className="mb-3 col-lg-6 col-md col-12">
                <label htmlFor="orderdate" className="form-label">Date: </label>
                <input type="date" className="form-control" id="date" 
                onChange={(e)=>{

                  setOrderDate(e.target.value) ;
                    
                 }}/>
            </div>

            <div className="mb-3 col-lg-6 col-md col-12">
                <label htmlFor="requireDate" className="form-label">Required Date: </label>
                <input type="date" className="form-control" id="reqdate" 
                onChange={(e)=>{

                  setRequiredDate(e.target.value) ;
                    
                 }}/>
            </div>
            {/* Add Item Section */}
        <div className="row mb-3 justify-content-center">
          <div className="col-6 p-4 bg-light rounded">
            <h5>Add Item</h5>
            <div className="mb-3">
              <label htmlFor="itemName" className="form-label">
                Item Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity:
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price:
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary d-block mx-auto"
              onClick={addItem}
            >
              Add Item
            </button>
          </div>
        </div>

       {/* Display Items Table */}
        <div className="row mb-3">
          <div className="col">
            <h5>Items Added</h5>
            <table className="table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removeItem(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Amount */}
        <div className="row mb-3">
          <div className="col">
            <h5>Total Amount: ${totalAmount}</h5>
          </div>
        </div>
            </div>
            
            {/* Submit Button */}
        <div className="row mb-3 justify-content-center">
          <div className="col-6">
            <button type="submit" className="btn btn-primary d-block mx-auto">
              Submit Order
            </button>
          </div>
        </div>
        
        </form></div>
        </div>
        
    )
}