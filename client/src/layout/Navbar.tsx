import React from 'react'
import { Link } from "react-router-dom";
const Navbar = () => {
     return (
          <nav>
               <Link to="/">Home</Link>
               <Link to="/login">login</Link>
               <Link to="/register">register</Link>
          </nav>
     )
}

export default Navbar