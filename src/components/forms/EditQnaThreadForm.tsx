import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateThread, getThreadById } from '../../store/service/threadsService';
import { useNavigate } from 'react-router-dom';
import './AddThreadForm/addThreadForm.css'

const EditThreadForm: React.FC = () => {

    // Get threadId and category from URL params
    const { threadId, category } = useParams<{ threadId?: string; category?: string }>();

    // Initialize user-related data
    const user: string = ""
    const min: number = 1;
    const max: number = 1000000;
    const randomNumber: number = Math.floor(Math.random() * (max - min + 1)) + min;

    // Create a user object with a random ID and username
    const userObject: User = {
        id: randomNumber,
        name: user,
        userName: user + randomNumber,
    }

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

    // Initialize thread states
    const [thread, setThread] = useState<QNAThread | null>(null);
    console.log('thread: ')
    console.log(thread)
    const [newThreadInfo, setNewThreadInfo] = useState<QNAThread>({
        title: '',
        description: '',
        category: category as QnaCategory,
        id: randomNumber,
        creator: userObject,
        creationDate: formattedDate,
        isAnswered: false, // Provide a default value
              
    });
    const navigate = useNavigate();

    // Fetch thread data and populate the form if threadId is provided
    useEffect(() => {
        if (threadId) {
          getThreadById(threadId, 'qna')
            .then((response) => {
              if (response) {
                console.log(response);
                setThread(response);   
                // Update newThreadInfo with thread data           
                setNewThreadInfo((prev) => ({
                  ...prev,
                  title: response.title,
                  description: response.description,
                  category: response.category,
                  id: response.id,
                  creator: response.creator,
                  creationDate: response.creationDate,
                  isAnswered: response.isAnswered,
                }));
              } else {
                console.log('Tråden hittades inte.');
              }
            // }
            })
                .catch((error) => {
                    // Handle errors here
                    console.error('Fel vid hämtning av tråd:', error);
                });
        }
    }, [threadId, category]);

    // Function to handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewThreadInfo({
            ...newThreadInfo,
            [name]: value,
        });
    };

    // Function to perform a full page reload
    function reloadPage() {
        window.location.reload(); // Pass 'true' to force a hard reload from the server
    }

    function handleNavigation() {
        // Navigate to the new URL
        navigate('/category/qna');
      
        // Perform a full page reload
        reloadPage();
      }

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Update the thread using the provided data
        if (thread && threadId) {
            await updateThread(threadId, thread, newThreadInfo);
            
            // Navigate to the specified category page and reload the page
            handleNavigation()
            // navigate('/category/qna')
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
                            <textarea
                                id="description"
                                name="description"
                                value={newThreadInfo.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label className='form-label' htmlFor="category">Category:</label>
                            <select
                                required
                                className="form-select"
                                id="category"
                                name="category"
                                value={newThreadInfo.category}
                                onChange={handleInputChange}
                            >
                                <option value="general">General</option>
                                <option value="qna">QNA</option>
                                <option value="news">News</option>
                                <option value="sports">Sports</option>
                                <option value="politics">Politics</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <button type="submit">Update Thread</button>
                    </form>
                </div>
            ) : (
                // If the thread is not found, display an error message
                <p>Tråden hittades inte.</p>
            )}
        </div>
    );
};

export default EditThreadForm;