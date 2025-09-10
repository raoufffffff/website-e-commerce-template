import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import ProductPage from './pages/ProductPage.jsx';
import MainPage from './pages/MainPage.jsx';
import Contact from './pages/Contact.jsx';
import Faqs from './pages/Faqs.jsx';
import Thnaks from './pages/Thnaks.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<App />}>
      <Route index element={<MainPage />} />
      <Route path='/Product/:id' element={<ProductPage />} />
      <Route path='/Contact' element={<Contact />} />
      <Route path='/Faqs' element={<Faqs />} />
      <Route path='/thanks' element={<Thnaks />} />

    </Route>

  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
