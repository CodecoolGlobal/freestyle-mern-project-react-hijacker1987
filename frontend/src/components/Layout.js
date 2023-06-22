import { React, useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

import './design/Layout.css';

export default function Layout({ loggedIn }) {

  const [loggedInToMyAccount, setLoggedInToMyAccount] = useState(``);

  useEffect(() => {
    (loggedIn)? setLoggedInToMyAccount(`My Account`) : setLoggedInToMyAccount(`Login/Register`);
  }, [loggedIn]);
  
  return (
    <div className="layout-container">
      <div className='navbar'>
        <Link to='/main'><button>Main page</button></Link>
        <Link to='/account'><button>{ loggedInToMyAccount }</button></Link>
      </div>
      <Outlet />
    </div>
  );
}
