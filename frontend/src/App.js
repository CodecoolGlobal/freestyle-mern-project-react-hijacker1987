import { React } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Layout from './components/Layout';
import Main from './components/Main';
import RegistrationForm from './components/RegistrationForm';
import LoginUser from './components/LoginUser';

import './App.css';

function Parent({string}) {
    return (
      <div>
        {string}
        <Outlet/>
        <p>Hey I am some text</p>
      </div>
    )
}

function Child({string}) {
  return (
    <div>
      {string}
      <Outlet/>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout/>}>  (//This route will return the navbar)
            <Route path='/main' element={<Main/>}/>  (//Child route will return the navbar and the main component, effectively you get two components)
            <Route path='/register' element={<RegistrationForm/>}/>
            <Route path='/account' element={<LoginUser/>}
            />
          </Route>

          {/* <Route path='/' element={<Layout/>}></Route>
          <Route path='/something' element={<Layout/>}></Route> */}


           {/* <Route path='/parent' element={<Parent string={"PARENT"}/>}></Route>
           <Route path='/parent/parent1' element={<Parent1 string={"PARENT1"}/>}/>
           <Route path='/parent/parent2' element={<Parent1 string={"PARENT2"}/>}/>
           <Route path='/parent/parent3' element={<Parent1 string={"PARENT3"}/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}
