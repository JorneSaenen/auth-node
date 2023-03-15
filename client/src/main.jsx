import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Secure from './Secure';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/secure',
    element: <Secure />,
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
