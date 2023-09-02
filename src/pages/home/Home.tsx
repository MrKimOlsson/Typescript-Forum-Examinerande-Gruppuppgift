import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'

const Home = () => {
  return (
    <div className='wrapper'>
        <h2>Home</h2>
        <Link to={'/add-thread'} className='new-thread-div'>
          <p>Add new thread</p>
          <div className='plus-icon'>+</div>
        </Link>
        <p>Do we need a home or should the forum be the home page?</p>
    </div>
  )
}

export default Home