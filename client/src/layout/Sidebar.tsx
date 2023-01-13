import { useLocation } from 'react-router-dom'
import Navbar from './Navbar';

const Sidebar = () => {
     const location = useLocation().pathname === '/' ? true : false;
     return (
          <>
               {location && <div id='Sidebar' className='text-dark border-r border-borderColor'>
                    <Navbar/>
               </div>}
          </>

     )
}

export default Sidebar