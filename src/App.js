import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';

import AppNav from './components/AppNav';

const App = () => {
    return (
        <div className="App">
          <AppNav />
          <Outlet />
        </div>
    );
}

export default App;
