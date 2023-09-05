import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo-large.png'
import './home.css'

const Home = () => {
  return (
    <div className='wrapper'>
        <Link to='/' ><img src={Logo} alt="logo" className="logo-img-large"/></Link>
        <Link to={'/add-thread'} className='new-thread-div threadEven'>
          <h3>Add new thread</h3>
          <div className='plus-icon'>+</div>
        </Link>
        <Link className='threadOdd' to='/general'>
          <h3>General threads</h3>
        </Link>
        <Link className='threadEven' to='/qna'>
          <h3>QNA threads</h3>
        </Link>

        <Link className='threadOdd' to='/news'>
          <h3>News threads</h3>
        </Link>
        <Link className='threadEven' to='/sports'>
          <h3>Sports threads</h3>
        </Link>
        <Link className='threadOdd' to='/politics'>
          <h3>Politics threads</h3>
        </Link>
        <Link className='threadEven' to='/other'>
          <h3>Other threads</h3>
        </Link>
  
      </div>
  )
}



export default Home