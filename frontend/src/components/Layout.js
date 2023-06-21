import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import './design/Layout.css';

export default function Layout() {
  return (
    <div className="layout-container">
      <div className='navbar'>
        <Link to='/main'><button>Main page</button></Link>
        <Link to='/register'><button>Register</button></Link>
        <Link to='/account'><button>Own account</button></Link>
      </div>
      <Outlet />
    </div>
  );
}
