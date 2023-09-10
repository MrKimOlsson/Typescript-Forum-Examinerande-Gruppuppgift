import React, { useState } from 'react'
import './addThreadForm.css'
import { User, ThreadCategory, QnaCategory } from '../../../types'
import { addThread, addQnaThread } from '../../../store/service/threadsService'
import { useNavigate } from 'react-router-dom'
import { addUser, getUserByName } from '../../../store/service/userService'

const AddThreadForm = () => {

      // Define states for various form inputs
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('general')
    const [user, setUser] = useState('')

    // Initialize the React Router DOM's navigation function
    const navigate = useNavigate()

    // Function to handle form submission
    const addNewThread = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Generate a random number for the thread's ID
        const min: number = 1;
        const max: number = 1000000;
        const randomNumber: number = Math.floor(Math.random() * (max - min + 1)) + min;

        // Get the current date and format it
        const creationDate = new Date()
        const timeZone = 'Europe/Stockholm';
        const dateFormatter = new Intl.DateTimeFormat('sv-SE', {timeZone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })

        const formattedDate = dateFormatter.format(creationDate)

        // Create a user object with random ID and username
        const userObject: User = {
            id: randomNumber,
            name: user,
            userName: user + randomNumber,
        }

        // Check if the selected category is 'qna' and add a Q&A thread
        if (category === 'qna') {
            addQnaThread({
              id: randomNumber,
              title,
              description,
              category: category as QnaCategory,
              creator: userObject,
              creationDate: formattedDate,
              isAnswered: false, // Provide a default value
            });
          } else {
            // Add a regular thread
            addThread({
              id: randomNumber,
              title,
              description,
              category: category as ThreadCategory,
              creator: userObject,
              creationDate: formattedDate,
            });
          }

            // Check if the user already exists, if not, add the user
            const userByName = await getUserByName(userObject.name)
            if(userByName) {
                console.log('user already exist')
                navigate('/')
                return
            } else {
                console.log('user does not exist, added user with id: ' + randomNumber)
                addUser(userObject)
            }
            // Navigate back to the homepage after form submission
            navigate('/')
    }


  return (
    <form onSubmit={(e) => addNewThread(e)} className='thread-form'>
        <div className="input-group">
            <label htmlFor="title" className='form-label'>Title</label>
            <input
             required
             onChange={(e) => setTitle(e.target.value)} 
             type="text" 
             className='form-control' 
             id='title'  
             value={title}
             />
        </div>
        <div className="input-group">
            <label htmlFor="description" className='form-label'>Description</label>
            <textarea
             required
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             className='form-textarea' 
             name="description" 
             id="description"> 
             </textarea>
        </div>
        <div className='input-group'>
            <label htmlFor="category" className='form-label'>Category</label>
            <select
             required
             className='form-select' 
             id='category'
             value={category}
             onChange={(e) => setCategory(e.target.value)}
             >
                <option value="general">General</option>
                <option value="qna">QNA</option>
                <option value="news">News</option>
                <option value="sports">Sports</option>
                <option value="politics">Politics</option>
                <option value="other">Other</option>
             </select>
        </div>
        <div className='input-group'>
            <label htmlFor="user" className='form-label'>Publisher</label>
            <input
             required
             value={user}
             onChange={(e) => setUser(e.target.value)}
             type="text" 
             className='form-control' 
             id='user' 
             />
        </div>
        <button type='submit'>Publish</button>
    </form>
  )
}

export default AddThreadForm