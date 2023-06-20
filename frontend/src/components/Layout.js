import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
        <div className='navbar'>
            <Link to='/main'><button>Main page</button></Link>
            <Link to='/register'><button>Register</button></Link>
            <Link to='/account'><button>Own account</button></Link>
            {/* <Link to={"/something"}></Link> === <a href='http://localhost:3000/something'></a> */}
        </div>
        <Outlet/>
    </div>
  )
}
