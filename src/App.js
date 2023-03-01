import React from 'react';

import './App.css';

import AppNav from './components/AppNav';
import AppRoutes from './routes/AppRoutes';

const App = () => {
    return (
        <div className="App">
          <AppNav />
          <AppRoutes />
        </div>
    );
}

export default App;
