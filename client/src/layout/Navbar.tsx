import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import SyncIcon from '@mui/icons-material/Sync';
import GroupsIcon from '@mui/icons-material/Groups';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { getLoggedInUser, logout } from '../services/authentication';
import { redirect } from "react-router-dom";
import { useAuthContext } from '../context/authContext';
const Navbar = () => {

     const [open, setOpen] = React.useState(false);
     const [anchorEl, setAnchorEl] = React.useState(null);


     const { setIsLogin }: any = useAuthContext();

     const handleClick = (event: any) => {
          setAnchorEl(event.currentTarget);
          setOpen((previousOpen) => !previousOpen);
     };

     async function hundleLogout() {
          await logout()
          setIsLogin(false);
     }

     const canBeOpen = open && Boolean(anchorEl);
     const id = canBeOpen ? 'transition-popper' : undefined;
     return (
          <nav className='p-3 bg-[#F0F2F5] flex justify-between items-center'>
               <div>Img</div>
               <div>
                    <Button className='hover:bg-gray-100 focus:bg-[#D9DBDF] focus:outline-none rounded-full text-[#54656F]' variant="text"><GroupsIcon /></Button>
                    <Button className='hover:bg-gray-100 focus:bg-[#D9DBDF] focus:outline-none rounded-full text-[#54656F]' variant="text"><SyncIcon /></Button>
                    <Button className='hover:bg-gray-100 focus:bg-[#D9DBDF] focus:outline-none rounded-full text-[#54656F]' variant="text"><ChatIcon /></Button>
                    <Button aria-describedby={id} type="button" onClick={handleClick} className='hover:bg-gray-100 focus:bg-[#D9DBDF] focus:outline-none rounded-full text-[#54656F]' variant="text"><MoreVertIcon />
                         <Popper id={id} open={open} anchorEl={anchorEl} transition>
                              {({ TransitionProps }) => (
                                   <Fade {...TransitionProps} timeout={350}>
                                        <Box className='shadow-md rounded-md' sx={{ border: 1, bgcolor: 'background.paper' }}>
                                             <ul>
                                                  <li className='hover:bg-[#F0F2F5] px-5 py-2'><Link to={'#'} className='text-gray-600 text-md font-thin'>New group</Link></li>
                                                  <li className='hover:bg-[#F0F2F5] px-5 py-2'><Link to={'#'} className='text-gray-600 text-md font-thin'>New community</Link></li>
                                                  <li className='hover:bg-[#F0F2F5] px-5 py-2'><Link to={'#'} className='text-gray-600 text-md font-thin'>Archive</Link></li>
                                                  <li className='hover:bg-[#F0F2F5] px-5 py-2'><Link to={'#'} className='text-gray-600 text-md font-thin'>Pinned messages</Link></li>
                                                  <li className='hover:bg-[#F0F2F5] px-5 py-2'><Link to={'#'} className='text-gray-600 text-md font-thin'>Settings</Link></li>
                                                  <li onClick={() => hundleLogout()} className='hover:bg-gray-100 px-5 py-2'><Link to={'#'} className='text-gray-600 text-md font-thin'>Logout</Link></li>
                                             </ul>
                                        </Box>
                                   </Fade>
                              )}
                         </Popper>
                    </Button>
               </div>

          </nav>
     )
}

export default Navbar

function setIsLogin(arg0: (prev: any) => boolean) {
     throw new Error('Function not implemented.');
}
