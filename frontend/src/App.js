import { React, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './components/Main';
import Layout from './components/Layout';
import LoginUser from './components/LoginUser';
import UpdateAcc from './components/UpdateAcc';
import DeleteAcc from './components/DeleteAcc';
import RegistrationForm from './components/RegistrationForm';

import './App.css';

export default function App() {

  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ user, setUser ] = useState(null);
  const [ id, setId ] = useState(``);

  return (
    <BrowserRouter>
      <Routes>
          <Route 
            path='/' 
            element={<Layout loggedIn = { loggedIn } id = { id } />}>  (//This route will return the navbar)
            <Route 
              path='/main' 
              element={<Main loggedIn = { loggedIn } />}/>  (//Child route will return the navbar and the main component, effectively you get two components)
            <Route 
              path='/main/:id' 
              element={<Main loggedIn = { loggedIn } id = { id } />}/>
            <Route 
              path='/register' 
              element={<RegistrationForm/>}/>
            <Route 
              path='/account' 
              element={<LoginUser loggedIn = { loggedIn } setLoggedIn = { setLoggedIn } setId = { setId } setUser = { setUser }/>}/>
            <Route 
              path='/update' 
              element={<UpdateAcc user = { user } setUser = { setUser } setLoggedIn = { setLoggedIn }/>}/>
            <Route 
              path='/delete' 
              element={<DeleteAcc user = { user } setUser = { setUser } setLoggedIn = { setLoggedIn }/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}
