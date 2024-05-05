import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import React from 'react'
import { Route, Routes } from 'react-router-dom';



import ShowEmployee from './assets/pages/Employee/ShowEmployee';
import CreateEmployee from './assets/pages/Employee/CreateEmployee';
import DeleteEmployee from './assets/pages/Employee/DeleteEmployee';
import EditEmployee from './assets/pages/Employee/EditEmployee';
import ReadOneEmployee from './assets/pages/Employee/ReadOneEmployee';
import ReportEmployee from './assets/pages/Employee/ReportEmployee';

import CreateReturn from './assets/pages/Employee/Return/CreateReturn';
import DeleteReturn from './assets/pages/Employee/Return/DeleteReturn';
import EditReturn from './assets/pages/Employee/Return/EditReturn';
import ReadOneReturn from './assets/pages/Employee/Return/ReadOneReturn';
import ReportReturn from './assets/pages/Employee/Return/ReportReturn';
import ShowReturn from './assets/pages/Employee/Return/ShowReturn';



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

        <Route path='/returns/create' element={<CreateReturn />}></Route>
        <Route path='/returns/delete/:id' element={<DeleteReturn />}></Route>
        <Route path='/returns/edit/:id' element={<EditReturn />}></Route>
        <Route path='/returns/details/:id' element={<ReadOneReturn />}></Route>
        <Route path='/returns/reportReturn' element={<ReportReturn />}></Route>
        <Route path='/returns/allReturns' element={<ShowReturn />}></Route>

       
      </Routes>
    </>
  );


}

export default App;

