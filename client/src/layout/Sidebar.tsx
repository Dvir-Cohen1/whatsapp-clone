import { useLocation } from 'react-router-dom'

const Sidebar = () => {
     const location = useLocation().pathname === '/' ? true : false;
     return (
          <>
               {location && <div id='Sidebar' className='text-dark border-r border-borderColor'>Sidebar</div>}
          </>

     )
}

export default Sidebar