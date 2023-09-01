import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import './App.css'

// Pages
import Home from './pages/home/Home';
import Qna from './pages/qna/Qna';
import General from './pages/general/General'
import AddThread from './pages/addThread/AddThread';

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
        path: 'general',
        element: <General />,
      },
      {
        path: 'qna',
        element: <Qna />,
      },
      {
        path: 'add-thread',
        element: <AddThread />,
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
