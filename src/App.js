import React from 'react';

import './App.css';

import AppNav from './components/AppNav';
import Home from './views/Home';

function App() {
    return (
        <div className="App">
          <AppNav />
          <Home />
        </div>
    );
}

export default App;
