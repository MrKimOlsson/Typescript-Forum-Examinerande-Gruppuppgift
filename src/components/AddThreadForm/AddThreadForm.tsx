import React, { useState } from 'react'
import './addThreadForm.css'
import { Thread } from '../../types'

type AddThreadFormProps = {
    thread: Thread
}



const AddThreadForm = () => {

    const [thread, setThread] = useState<Thread[]>([])

  return (
    <form className='thread-form'>
        <div className="input-group">
            <label htmlFor="title" className='form-label'>Title</label>
            <input type="text" className='form-control' id='title'  />
        </div>
        <div className="input-group">
            <label htmlFor="description" className='form-label'>Description</label>
            <textarea className='form-textarea' name="description" id="description"></textarea>
        </div>
        <div className='input-group'>
            <label htmlFor="category" className='form-label'>Category</label>
            <select className='form-select' id='category'></select>
        </div>
        <div className='input-group'>
            <label htmlFor="user" className='form-label'>Publisher</label>
            <input type="text" className='form-control' id='user' />
        </div>

        <button type='submit'>Publish</button>
    </form>
  )
}

export default AddThreadForm