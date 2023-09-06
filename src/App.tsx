import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import './App.css'

// Pages
import Home from './pages/Home';
import Qna from './pages/Qna';
import News from './pages/News';
import Sports from './pages/Sports';
import Politics from './pages/Politics';
import Other from './pages/Other';
import General from './pages/General'
import AddThread from './pages/AddThread';
import ThreadsPage from './pages/ThreadsPage';
import EditThread from './pages/EditThread'

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
        path: ':category',
        element: <General />,
      },
      {
        path: ':category',
        element: <Qna />,
      },
      {
        path: ':category',
        element: <News />,
      },
      {
        path: ':category',
        element: <Sports />,
      },
      {
        path: ':category',
        element: <Politics />,
      },
      {
        path: ':category',
        element: <Other />,
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
