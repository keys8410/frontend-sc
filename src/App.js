import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import ProtectedRoute from './Components/Helpers/ProtectedRoute';
import Coord from './Components/Coord/Coord';

import { UserStorage } from './Components/Contexts/UserContext';
import Master from './Components/Master/Master';
import Tech from './Components/Tech/Tech';

import './Theme/mainTheme.scss';

const App = () => {
  return (
    <BrowserRouter>
      <UserStorage>
        <Routes>
          <Route path="/*" element={<Home />} />
          <ProtectedRoute path="/master/*" element={<Master />} />
          <ProtectedRoute path="/coord/*" element={<Coord />} />
          <ProtectedRoute path="/tech/*" element={<Tech />} />
        </Routes>
      </UserStorage>
    </BrowserRouter>
  );
};

export default App;
