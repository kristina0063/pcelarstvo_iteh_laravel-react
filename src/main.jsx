import { createRoot } from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import { Context } from './context/Context.jsx'
import router from './router/router.jsx';
import './assets/css/bootstrap.min.css';
import './assets/css/custom.css';
import './assets/css/responsive.css';

createRoot(document.getElementById('root')).render(
  <Context>
    <RouterProvider router={router} />
  </Context>
)
