import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo-large.png'


const Home = () => {
  return (
    <div className='wrapper'>
        <Link to='/' ><img src={Logo} alt="logo" className="logo-img-large"/></Link>
        <Link to={'/add-thread'} className='newThread even'>
          <h3>Add new thread</h3>
          <div className='plus-icon'>+</div>
        </Link>
        <Link className='threadCategory odd' to='/general'>
          <h3>General</h3>
          <p>Threads about everything between heaven and earth and beyond.</p>
        </Link>
        <Link className='threadCategory even' to='/qna'>
          <h3>QNA</h3>
          <p>Questions and answers. Ask anything about anything and you shall receive knowledge.</p>
        </Link>
        <Link className='threadCategory odd' to='/news'>
          <h3>News</h3>
          <p>All the latest news about stuff you actually care about, probably maybe.</p>
        </Link>
        <Link className='threadCategory even' to='/sports'>
          <h3>Sports</h3>
          <p>Everything about sports! For those who care about that stuff. I mean I don´t but maybe you do.</p>
        </Link>
        <Link className='threadCategory odd' to='/politics'>
          <h3>Politics</h3>
          <p>All the lies ever told in politics, collected in one space for you to enjoy.</p>
        </Link>
        <Link className='threadCategory even' to='/other'>
          <h3>Other</h3>
          <p>Threads about everything else. I don´t know, you tell me.</p>
        </Link>
  
      </div>
  )
}



export default Home