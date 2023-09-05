import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import './App.css'

// Pages
import Home from './pages/home/Home';
import Qna from './pages/qna/Qna';
import News from './pages/news/News';
import Sports from './pages/sports/Sports';
import Politics from './pages/politics/Politics';
import Other from './pages/other/Other';
import General from './pages/general/General'
import AddThread from './pages/addThread/AddThread';
import Thread from './pages/thread/Thread';
import EditThread from './pages/editThread/EditThread'

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
        element: <Thread />,
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
