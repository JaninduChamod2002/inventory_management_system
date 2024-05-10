

import { useState } from 'react' ;
import reactLogo from './assets/react.svg' ;
import viteLogo from '/vite.svg' ;

import React from 'react' ;
import { Route, Routes } from 'react-router-dom';

//import Home from './assets/pages/Home';
//import ReadOneHome from './assets/pages/ReadOneHome';





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

        {/* <Route path='/' element={<Home />}></Route> */}
        {/* <Route path='/Mlogin' element={<ManagerLogin />}></Route> */}


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

        

      </Routes>
    </>
  );


}

export default App;

