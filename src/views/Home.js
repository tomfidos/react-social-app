import React from 'react';

import './views.css';

import Posts from '../components/Posts';

const Home = () => {
    
    return (
        <div className="view">
            <h2>home</h2>
            <Posts />
        </div>
    );
}

export default Home;
