import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import React from 'react'
import { Route, Routes } from 'react-router-dom';



import CreateCustomer from './assets/pages/Customer/CreateCustomer';
import ShowCustomer from './assets/pages/Customer/ShowCustomer';
import EditCustomer from './assets/pages/Customer/EditCustomer';
import DeleteCustomer from './assets/pages/Customer/DeleteCustomer';
import ReadOneCustomer from './assets/pages/Customer/ReadOneCustomer';
import ReportCustomer from './assets/pages/Customer/ReportCustomer';



const App = () => {
  return (

    
    <>
    
      {/* <Header /> */}
      <Routes>


      

        <Route path='/customers/allCustomers' element={<ShowCustomer />}></Route>
        <Route path='/customers/create' element={<CreateCustomer />}></Route>
        <Route path='/customers/edit/:id' element={<EditCustomer />}></Route>
        <Route path='/customers/delete/:id' element={<DeleteCustomer />}></Route>
        <Route path='/customers/details/:id' element={<ReadOneCustomer />}></Route>
        <Route path='/customers/reportCustomer' element={<ReportCustomer />}></Route>

       

      </Routes>
    </>
  );


}

export default App;

