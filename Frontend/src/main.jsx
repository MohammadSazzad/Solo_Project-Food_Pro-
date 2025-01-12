import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements }from 'react-router-dom'
import Layout from './Layout.jsx'
import Login from './pages/customer/Login.jsx'
import Profile from './pages/customer/Profile.jsx'
import ProductContextProvider from './store/ProductContextProvider.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<App />} />
      <Route path= "customer" >
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="logout" element={<App />} />
      </Route>
    </Route>
    
  )
)

const x = localStorage.getItem('token');
console.log(x);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductContextProvider>
      <RouterProvider router={router} />
    </ProductContextProvider>
  </StrictMode>,
)
