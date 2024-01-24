import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Discours from './Discours';
import Documents from './Documents.jsx';
import HomePage from './HomePage.jsx';
import Predication from './Predication.jsx';
/* import History from './History.jsx'; */
import WeeklyMeeting from './WeeklyMeeting.jsx';
import Connexion from './Connexion.jsx';
// import Contact from './Contact.jsx';
//import Login from './Login.jsx';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/discours',
        element: <Discours />,
      },
     
      {
        path: '/weeklyMeeting',
        element: <WeeklyMeeting />
      },

      {
        path: '/predication',
        element: <Predication />
      },
      {
        path:'/connexion',
        element:<Connexion />,
      },
      
      {
        path: '/documents',
        element: <Documents />,
        errorElement: <Error />,
      }
    ]
  }
]);