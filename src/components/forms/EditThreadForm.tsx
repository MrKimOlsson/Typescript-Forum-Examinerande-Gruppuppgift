import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateThread, getThreadById } from '../../store/service/threadsService';
import { useNavigate } from 'react-router-dom';
import './AddThreadForm/addThreadForm.css'
// import { ThreadCategory, Thread, User } from '../../types';

const EditThreadForm: React.FC = () => {
    const { threadId, category } = useParams<{ threadId?: string; category?: string }>();
    const user: string = ""
    const min: number = 1;
    const max: number = 1000000;
    const randomNumber: number = Math.floor(Math.random() * (max - min + 1)) + min;

    const userObject: User = {
        id: randomNumber,
        name: user,
        userName: user + randomNumber,
    }

    const [thread, setThread] = useState<Thread | null>(null);
    const [newThreadInfo, setNewThreadInfo] = useState<Thread>({
        title: '',
        description: '',
        category: category as ThreadCategory,
        id: randomNumber,
        creator: userObject,
        creationDate: new Date().toISOString(),
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (threadId) {
          getThreadById(threadId, category)
            .then((response) => {
              if (response) {
                console.log(response);
                setThread(response);
                setNewThreadInfo((prev) => ({
                  ...prev,
                  title: response.title,
                  category: response.category,
                  id: response.id,
                  creator: response.creator,
                  creationDate: response.creationDate,
                }));
              } else {
                console.log('Tråden hittades inte.');
              }
            })
                .catch((error) => {
                    // Hantera fel här
                    console.error('Fel vid hämtning av tråd:', error);
                });
        }
    }, [threadId, category]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewThreadInfo({
            ...newThreadInfo,
            [name]: value,
        });
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (thread && threadId) {
            await updateThread(threadId, thread, newThreadInfo);

            navigate('/category/general')
            //   navigate(`/general/${threadId}`);
        } else {
            console.error('Invalid threadId');
        }
    };

    return (
        <div className='wrapper'  >
            {thread ? (
                // Om tråden finns, visa formuläret med informationen som placeholder
                <div>
                    <h1>Edit Thread</h1>
                    <form className='thread-form' id='editFormWrapper' onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className='form-label' htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={newThreadInfo.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label className='form-label' htmlFor="description">Description:</label>
                            <textarea className='form-textarea'
                                id="description"
                                name="description"
                                value={newThreadInfo.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit">Update Thread</button>
                    </form>
                </div>
            ) : (
                // Om tråden inte hittades, visa ett felmeddelande
                <p>Tråden hittades inte.</p>
            )}
        </div>
    );
};

export default EditThreadForm;