import React, { useState } from 'react'
import './addThreadForm.css'
import { Thread, User, ThreadCategory } from '../../../types'
import { useDispatch } from 'react-redux'
import { addThread } from '../../../store/service/threadsService'
import { useNavigate } from 'react-router-dom'
import { addUser, getUserByName } from '../../../store/service/userService'

const AddThreadForm = () => {
    // const [thread, setThread] = useState<Thread[]>([]) - VARFÖR VAR DEN HÄR HÄR? :S
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('general')
    const [user, setUser] = useState<string>('')

    const navigate = useNavigate()
    // const dispatch = useDispatch()

    const addNewThread = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const min: number = 1;
        const max: number = 1000000;
        const randomNumber: number = Math.floor(Math.random() * (max - min + 1)) + min;

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

        const userObject: User = {
            id: randomNumber,
            name: user,
            userName: user + randomNumber,
        }

            addThread({
                id: randomNumber,
                title,
                description,
                category: category as ThreadCategory,
                creator: userObject,
                creationDate: formattedDate,
                // creationDate: new Date().toISOString(),
            })

            const userByName = await getUserByName(userObject.name)
            if(userByName) {
                console.log('user already exist')
                navigate('/')
                return
            } else {
                console.log('user does not exist, added user with id: ' + randomNumber)
                addUser(userObject)
            }
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