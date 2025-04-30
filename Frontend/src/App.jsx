import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import About from './Pages/About/About';
import Home from './Pages/Home/Home';
import Women from './Pages/Women/Women';
import Men from './Pages/Men/Men';
import Contact from './Pages/Contact/Contact';
import Kids from './Pages/Kids/Kids';
import Footer from './Components/Footer/Footer';
import TopSelling from './Pages/TopSelling/TopSelling';
import '@fortawesome/fontawesome-free/css/all.min.css';
import InnerDisplay from './Components/InnerDisplay/InnerDisplay';
import Cart from './Components/Cart/Cart';
import Login from './Pages/LoginSignup/Login';
import Signup from './Pages/LoginSignup/Signup';
import AuthLayout from './layouts/AuthLayout';
import RefrshHandler from './Pages/LoginSignup/RefrshHandler';
import DeliveryAddress from './Pages/DeliveryAddress/DeliveryAddress';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }
  return (
    <>   
    <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
              <Route path='/home' element={<PrivateRoute element={<Home />} />} />
                <Route path="/about" element={<About />} />
                <Route path="/men" element={<Men />} />
                <Route path="/women" element={<Women />} />
                <Route path="/kids" element={<Kids />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/topselling" element={<TopSelling />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:productID" element={<InnerDisplay />} />
                <Route path="/delivery_address" element={<DeliveryAddress />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default App;
