import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import About from './Pages/About/About'
import Home from './Pages/Home/Home'
import Women from './Pages/Women/Women'
import Men from './Pages/Men/Men'
import Contact from './Pages/Contact/Contact'
import Kids from './Pages/Kids/Kids'
import Footer from './Components/Footer/Footer'
import TopSelling from './Pages/TopSelling/TopSelling'
import '@fortawesome/fontawesome-free/css/all.min.css';
import InnerDisplay from './Components/InnerDisplay/InnerDisplay'
import Login from './Pages/Auth/Login/Login'
import Signup from './Pages/Auth/Signup/Signup'
import Cart from './Components/Cart/Cart'
const App = () => {
  return (
    <div>
      <Navbar></Navbar>

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/men' element={<Men></Men>}></Route>
        <Route path='/women' element={<Women></Women>}></Route>
        <Route path='/kids' element={<Kids></Kids>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/topselling' element={<TopSelling></TopSelling>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path="/cart" element={<Cart />} />
        <Route path='/product/:productID' element={<InnerDisplay></InnerDisplay>}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
