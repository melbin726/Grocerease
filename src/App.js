import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { ThemeProvider, CssBaseline } from '@mui/material';
//import theme from './theme';
import Login from './Pages/Login';
import Home from './Pages/Home';
import ManageProducts from './Pages/ManageProducts'

import Profile from './Pages/Profile'
import Register from './Pages/Register';
import CartPage from './Pages/CartPage';
import Orders from './Pages/Orders';
import OrderDetails from './Components/OrderDetails';
import { ThemeProvider } from './Components/ThemeProvider';

import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import PrivacyPolicy from './Components/PrivacyPolicy';


function App() {
    return (
        // <ThemeProvider theme={theme}>
        //     <CssBaseline />
        <ThemeProvider>
            <Router>
                <Routes>
                <Route path="/" element={<  Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
               
                    <Route path="/Profile.js" element={<Profile />} /> 
                    <Route path="/ManageProducts" element={<ManageProducts/>} /> 
                    <Route path="/cart" element={<CartPage/>} /> 
                    <Route path="/Orders" element={<Orders/>} /> 
                    <Route path="/OrderDetails" element={<OrderDetails/>} /> 
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
             
                
                
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
