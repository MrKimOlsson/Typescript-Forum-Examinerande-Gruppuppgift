import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import Logo from '../../assets/logo.png'
import './navbar.css'

const Navbar = () => {
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const menuItems = document.querySelectorAll(".menuItem");
    const hamburger = document.querySelector(".hamburger");
    
    const toggleMenu = () => {
      navbar?.classList.toggle("change");
      navbar?.classList.toggle("showMenu");
    };

    menuItems.forEach((menuItem) => {
      menuItem.addEventListener("click", toggleMenu);
    });
    hamburger?.addEventListener("click", toggleMenu);

    return () => {
      menuItems.forEach((menuItem) => {
        menuItem.removeEventListener("click", toggleMenu);
      });

      hamburger?.removeEventListener("click", toggleMenu);
    };
  }, []);

  return (
    <>
     <nav className='navbar'>

            <menu className="menu-desktop">
              {/* <Link to='/' ><img src={Logo} alt="logo" className="link logo-img"/></Link> */}
              <li><NavLink className='nav-link' to='/'>Home</NavLink></li>
              <li><NavLink className='nav-link' to='/forum'>Forum</NavLink></li>
              <li><NavLink className='nav-link' to='/thread'>Thread</NavLink></li>
            </menu>
   
            {/*-- Hidden menu --*/}
            <menu className="menuMobile">
                <li><NavLink className="menuItem" to="/">Home</NavLink></li>
                <li><NavLink className="menuItem" to='/forum'>Forum</NavLink></li>
                <li><NavLink className="menuItem" to='/thread'>Thread</NavLink></li>
            </menu>

            {/*-- Hamburger --*/}
            <div>
            {/* <Link to='/' ><img src={Logo} alt="logo" className="link logo-img-mobile"/></Link>
            <Link to='/' ><img src={Logo} alt="logo" className="menu-logo logo-img"/></Link> */}
            </div>
            <div className="hamburger">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
      </nav>
    </>
  )
}

export default Navbar