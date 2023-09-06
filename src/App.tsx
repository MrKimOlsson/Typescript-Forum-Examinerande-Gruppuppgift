import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import './App.css'

// Pages
import Home from './pages/Home';
import Qna from './pages/Qna';
import AddThread from './pages/AddThread';
import ThreadsPage from './pages/ThreadsPage';
import EditThread from './pages/EditThread'
import ThreadCategory from './pages/ThreadCategory';

const App = () => {

  // Create a BrowserRouter using the createBrowserRouter function
  const router = createBrowserRouter([
    {
      
      path: '/',
      element: <RootLayout />,
      // errorElement: <Error />,
      children: [
      // Route for the home page
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'qna',
        element: <Qna />,
      },
      {
        path: 'category/:category',
        element: <ThreadCategory />,
      },
      {
        path: 'add-thread',
        element: <AddThread />,
      },     
      {
        path: 'edit-thread/:category/:threadId', 
        element: <EditThread />,
      },
      {
        path: 'thread/:category/:id',
        element: <ThreadsPage />,
      },   
      ],
    },
  ]);

  return (
    <>
      {
        <div className='app'>
          <RouterProvider router={router} />
        </div>
      }
    </>
  );
};

export default App;
