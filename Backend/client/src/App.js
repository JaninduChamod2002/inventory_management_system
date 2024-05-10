import './App.css';
import Header from './assets/pages/Header';
import AddOrder from './assets/pages/AddOrder';
import OredrStatus from './assets/pages/Orderstatus';
import AllOrder from './assets/pages/AllOrder';
import UpdateStatus from './assets/pages/UpdateStatus';
import UpdateOrder from './assets/pages/UpdateOrder';
import PurchaseReport from './assets/pages/PurchaseReport';
import PurchaseMailer from './assets/pages/PurchaseMailer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 


function App() {
  return (
    <Router>
      <div >
      <Header />
      <Routes>
          <Route path="/add" exact Component={AddOrder}/>
          <Route path="/status" exact Component={OredrStatus}/>
          <Route path="/" exact Component={AllOrder}/>
          <Route path="/report" exact Component={PurchaseReport}/>
          <Route path="/email" exact Component={PurchaseMailer}/>
          <Route path="/update/:orderID" element={<UpdateStatus />} />
          <Route path="/change/:orderID" element={<UpdateOrder />} />

      </Routes>
      </div>
    </Router>
  );
}

export default App;
