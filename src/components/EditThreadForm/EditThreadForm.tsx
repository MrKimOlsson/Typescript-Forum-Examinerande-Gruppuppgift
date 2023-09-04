import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateThread, getThreadById } from '../../service/threadsService';
import { useNavigate } from 'react-router-dom';
import '../../index.css'

const EditThreadForm: React.FC = () => {
  const { threadId } = useParams<{ threadId?: string }>();
  const [thread, setThread] = useState<any>(null);
  const [newThreadInfo, setNewThreadInfo] = useState<any>({
    title: '',
    description: '',
    category: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (threadId) {
      getThreadById(threadId)
        .then((response) => {
          if (response) {
            console.log(response);
            setThread(response);

            // Uppdatera newThreadInfo med befintlig information från tråden
            setNewThreadInfo({
              title: response.title,
              description: response.description,
              category: response.category,
            });
          } else {
            console.log('Tråden hittades inte.');
          }
        })
        .catch((error) => {
            // Hantera fel här
          console.error('Fel vid hämtning av tråd:', error);
        });
    }
  }, [threadId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewThreadInfo({
      ...newThreadInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (threadId) {
      await updateThread(threadId, newThreadInfo);

      navigate('/general')
    //   navigate(`/general/${threadId}`);
    } else {
      console.error('Invalid threadId');
    }
  };
  
  return (
    <div className='wrapper'>
      {thread ? (
        // Om tråden finns, visa formuläret med informationen som placeholder
        <div>
          <h1>Edit Thread</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newThreadInfo.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={newThreadInfo.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={newThreadInfo.category}
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
