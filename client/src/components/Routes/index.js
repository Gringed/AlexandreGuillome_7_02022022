import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../Navbar';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Users from '../../pages/Users';
const index = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/profil' exact element={<Profil />} />
                <Route path='/users' exact element={<Users />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default index;