import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
        <div className='navbar'>
            <Link to='/main'><button>Main page</button></Link>
            <Link to='/something1'><button>something1</button></Link>
            <Link to='/something2'><button>something2</button></Link>
            {/* <Link to={"/something"}></Link> === <a href='http://localhost:3000/something'></a> */}
        </div>
        <Outlet/>
    </div>
  )
}
