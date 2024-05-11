import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Header from './assets/pages/Return/Header';


import CreateReturn from './assets/pages/Return/CreateReturn';
import DeleteReturn from './assets/pages/Return/DeleteReturn';
import EditReturn from './assets/pages/Return/EditReturn';
import ReadOneReturn from './assets/pages/Return/ReadOneReturn';
import ReportReturn from './assets/pages/Return/ReportReturn';
import ShowReturn from './assets/pages/Return/ShowReturn';



const App = () => {
  return (

    
    <>
    
      <Header />
      <Routes>


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

