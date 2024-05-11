

import { useState } from 'react' ;
import reactLogo from './assets/react.svg' ;
import viteLogo from '/vite.svg' ;

import React from 'react' ;
import { Route, Routes } from 'react-router-dom';

import Headeremp from './assets/pages/Employee/Headeremp'

//import Home from './assets/pages/Home';
//import ReadOneHome from './assets/pages/ReadOneHome';


import Headerpurch from './assets/pages/PurchaseManagement/Header';
import AddOrder from './assets/pages/PurchaseManagement/AddOrder';
import OredrStatus from './assets/pages/PurchaseManagement/Orderstatus';
import AllOrder from './assets/pages/PurchaseManagement/AllOrder';
import UpdateStatus from './assets/pages/PurchaseManagement/UpdateStatus';
import UpdateOrder from './assets/pages/PurchaseManagement/UpdateOrder';
import PurchaseReport from './assets/pages/PurchaseManagement/PurchaseReport';
import PurchaseMailer from './assets/pages/PurchaseManagement/PurchaseMailer';



import ShowEmployee from './assets/pages/Employee/ShowEmployee';
import CreateEmployee from './assets/pages/Employee/CreateEmployee';
import DeleteEmployee from './assets/pages/Employee/DeleteEmployee';
import EditEmployee from './assets/pages/Employee/EditEmployee';
import ReadOneEmployee from './assets/pages/Employee/ReadOneEmployee';
import ReportEmployee from './assets/pages/Employee/ReportEmployee';

import ShowEmployeeAttendence from './assets/pages/EmployeeAttendence/ShowEmployeeAttendence';
import CreateEmployeeAttendence from './assets/pages/EmployeeAttendence/CreateEmployeeAttendence';
import EditEmployeeAttendence from './assets/pages/EmployeeAttendence/EditEmployeeAttendence';
import DeleteEmployeeAttendence from './assets/pages/EmployeeAttendence/DeleteEmployeeAttendence';
import ReportEmployeeAttendence from './assets/pages/EmployeeAttendence/ReportEmployeeAttendence';
import Login from './assets/pages/Login';

import Header from './assets/pages/Return/Header';


import CreateReturn from './assets/pages/Return/CreateReturn';
import DeleteReturn from './assets/pages/Return/DeleteReturn';
import EditReturn from './assets/pages/Return/EditReturn';
import ReadOneReturn from './assets/pages/Return/ReadOneReturn';
import ReportReturn from './assets/pages/Return/ReportReturn';
import ShowReturn from './assets/pages/Return/ShowReturn';



import CreateCustomer from './assets/pages/Customer/CreateCustomer';
import ShowCustomer from './assets/pages/Customer/ShowCustomer';
import EditCustomer from './assets/pages/Customer/EditCustomer';
import DeleteCustomer from './assets/pages/Customer/DeleteCustomer';
import ReadOneCustomer from './assets/pages/Customer/ReadOneCustomer';
import ReportCustomer from './assets/pages/Customer/ReportCustomer';







//import Dashboard from './assets/pages/dashboard/dashboard';

//import CusDashboard from './assets/pages/customerDashBoard/cusDashboard'; 

//import CLogin from './assets/components/cLogin';



//import ManagerLogin from './assets/components/ManagerLogin';
//import Header from './assets/components/Header';

const App = () => {
  return (

    
    <>
    
      {/* <Header /> */}
      
      <Routes>


      
        
        <Route path='/employees/allEmployee' element={<ShowEmployee />}></Route>
        <Route path='/employees/create' element={<CreateEmployee />}></Route>
        <Route path='/employees/delete/:id' element={<DeleteEmployee />}></Route>
        <Route path='/employees/edit/:id' element={<EditEmployee />}></Route>
        <Route path='/employees/details/:id' element={<ReadOneEmployee />}></Route>
        <Route path='/employees/reportEmployee' element={<ReportEmployee />}></Route>
        <Route path='/login' element={<Login />}></Route>

        <Route path='/EmployeeAttendence/allEmployeeAttendence' element={<ShowEmployeeAttendence />}></Route>
        <Route path='/EmployeeAttendence/create' element={<CreateEmployeeAttendence />}></Route>
        <Route path='/EmployeeAttendence/edit/:id' element={<EditEmployeeAttendence />}></Route>
        <Route path='/EmployeeAttendence/delete/:id' element={<DeleteEmployeeAttendence />}></Route>
        <Route path='/EmployeeAttendence/reportEmployeeAttendence' element={<ReportEmployeeAttendence />}></Route>


       
      

        <Route path='/returns/create' element={<CreateReturn />}></Route>
        <Route path='/returns/delete/:id' element={<DeleteReturn />}></Route>
        <Route path='/returns/edit/:id' element={<EditReturn />}></Route>
        <Route path='/returns/details/:id' element={<ReadOneReturn />}></Route>
        <Route path='/returns/reportReturn' element={<ReportReturn />}></Route>
        <Route path='/returns/allReturns' element={<ShowReturn />}></Route>

        
        <Route path='/customers/allCustomers' element={<ShowCustomer />}></Route>
        <Route path='/customers/create' element={<CreateCustomer />}></Route>
        <Route path='/customers/edit/:id' element={<EditCustomer />}></Route>
        <Route path='/customers/delete/:id' element={<DeleteCustomer />}></Route>
        <Route path='/customers/details/:id' element={<ReadOneCustomer />}></Route>
        <Route path='/customers/reportCustomer' element={<ReportCustomer />}></Route>

        <Route path="/add" element={<AddOrder />} />
        <Route path="/status" element={<OredrStatus />} />
        <Route path="/allOrder" element={<AllOrder />} />
        <Route path="/report" element={<PurchaseReport />} />
        <Route path="/email" element={<PurchaseMailer />} />
        <Route path="/update/:orderID" element={<UpdateStatus />} />
        <Route path="/change/:orderID" element={<UpdateOrder />} />


       

       

      </Routes>
    </>
  );


}

export default App;

