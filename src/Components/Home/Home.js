import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ResetPassword from './ResetPassword';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import LayoutHome from '../../Layout/LayoutHome';

const Home = () => {
  return (
    <LayoutHome>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset/*" element={<ResetPassword />} />
      </Routes>
    </LayoutHome>
  );
};

export default Home;
