import React from 'react'
import AddThreadForm from '../../components/AddThreadForm/AddThreadForm'
import '../../components/AddThreadForm/addThreadForm.css'


const AddThread = () => {
  return (
    <div className='wrapper'>
        <h3>Add new thread</h3>
        <p>Form for add new thread</p>
        <AddThreadForm />
    </div>
  )
}

export default AddThread