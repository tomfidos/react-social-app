import React from 'react';

import './App.css';
import AppNav from './components/AppNav';
import MainRoutes from './routes/AppRoutes';


const App = () => {

    return (
        <div className="App">
            <AppNav />
            <MainRoutes />
        </div>
    );
}

export default App;
