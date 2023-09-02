import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'

const Home = () => {
  return (
    <div className='wrapper'>
        <h2>Welcome to THE FORUM.</h2>
        <Link to={'/add-thread'} className='new-thread-div'>
          <p>Add new thread</p>
          <div className='plus-icon'>+</div>
        </Link>
        <Link className='card' to='/general'>
          <h3>General threads</h3>
        </Link>
        <Link className='card' to='/qna'>
          <h3>QNA threads</h3>
        </Link>
      </div>
  )
}



export default Home