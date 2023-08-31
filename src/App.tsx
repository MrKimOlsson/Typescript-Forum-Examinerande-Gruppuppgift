import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import './App.css'

// Pages
import Home from './pages/home/Home';
import Forum from './pages/forum/Forum';
import Thread from './pages/thread/Thread'

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
        path: 'forum',
        element: <Forum />,
      },
      {
        path: 'thread',
        element: <Thread />,
      },     
      ],
        

    },
  ]);
  // Render the RouterProvider component with the created router if authIsReady is true
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
