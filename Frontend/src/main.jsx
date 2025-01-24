import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements }from 'react-router-dom'
import Layout from './Layout.jsx'
import ResLogin from './pages/restuarant/Login.jsx'
import Login from './pages/customer/Login.jsx'
import Profile from './pages/customer/Profile.jsx'
import ProductContextProvider from './store/ProductContextProvider.jsx'
import Register from './pages/customer/Register.jsx'
import ResRegiser from './pages/restuarant/Register.jsx'
import UpdateProfile from './pages/customer/UpdateProfile.jsx'
import ResProfile from './pages/restuarant/Profile.jsx'
import ResUpdateProfile from './pages/restuarant/UpdateProfile.jsx'
import CategoryFood from './pages/foods/CategoryFood.jsx'
import FoodListing from './pages/restuarant/FoodListing.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<App />} />
      <Route path= "customer" >
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="logout" element={<App />} />
        <Route path="signup" element={<Register />} />
        <Route path="update" element={<UpdateProfile/>} />
      </Route>
      <Route path='restuarant'>
        <Route path='signup' element={<ResRegiser />} />
        <Route path='login' element={ < ResLogin /> } />
        <Route path='profile' element={< ResProfile />} />
        <Route path='logout' element={<App />} />
        <Route path='update' element={<ResUpdateProfile/>} />
        <Route path='foodListing' element={<FoodListing/>} />
      </Route>
      <Route path='foods'>
        <Route path='categoryFood/:categoryName/:categoryID' element={<CategoryFood/>} />
      </Route>
    </Route>
    
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductContextProvider>
      <RouterProvider router={router} />
    </ProductContextProvider>
  </StrictMode>,
)
