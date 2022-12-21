import { useLocation } from 'react-router-dom'
import { logout } from '../services/authentication';

const Sidebar = () => {
     const location = useLocation().pathname === '/' ? true : false;
     return (
          <>
               {location && <div id='Sidebar' className='text-dark border-r border-borderColor'>
                    <button className='text-white' onClick={logout}>Logout</button>
               </div>}
          </>

     )
}

export default Sidebar