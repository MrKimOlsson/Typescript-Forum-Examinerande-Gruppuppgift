import React, { useState } from 'react'
import './addThreadForm.css'
import { Thread, User } from '../../types'
import { useDispatch } from 'react-redux'
import { addThread } from '../../service/threadsService'
import { useNavigate } from 'react-router-dom'
import { addUser, getUserById, getUserByName } from '../../service/userService'


// type AddThreadFormProps = {
//     thread: Thread
// }




const AddThreadForm = () => {
    const [thread, setThread] = useState<Thread[]>([])

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [user, setUser] = useState<string>('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const addNewThread = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const min = 1;
        const max = 1000000;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;


        const userObject: User = {
            id: randomNumber,

            name: user,
            userName: user,
        }

            addThread({
                id: randomNumber,
                title,
                description,
                category: category as any,
                creator: userObject,
                creationDate: new Date().toISOString(),
            })

            const userByName = await getUserByName(userObject.name)
            console.log(userByName?.name)
            if(userByName) {
                console.log('user already exist')
            } else {
                console.log('user does not exist')
                addUser(userObject)
            }

        // addUser(userObject)

        console.log('added new thread' + thread)
        navigate('/')
    }


  return (
    <form onSubmit={(e) => addNewThread(e)} className='thread-form'>
        <div className="input-group">
            <label htmlFor="title" className='form-label'>Title</label>
            <input
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
             className='form-select' 
             id='category'
             value={category}
             onChange={(e) => setCategory(e.target.value)}
             >
                <option value="general">General</option>
                <option value="news">News</option>
                <option value="sports">Sports</option>
                <option value="politics">Politics</option>
                <option value="other">Other</option>
             </select>
        </div>
        <div className='input-group'>
            <label htmlFor="user" className='form-label'>Publisher</label>
            <input
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