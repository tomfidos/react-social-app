import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './UsersToFollow.css';

const RECOMMENDATIONS = 'https://akademia108.pl/api/social-app/follows/recommendations';


const UsersToFollow = () => {

    const [recommendedUsers, setRecommendedUsers] = useState([]);

    const getRecommendedUsers = () => {
        axios
            .post(RECOMMENDATIONS)
            .then(response => setRecommendedUsers(response.data))
            .catch(error => console.error(error));
    }

    useEffect(() => {
        getRecommendedUsers();
    }, []);

    return (
        <div className="form flex-row">
            <div className="user-to-follow">
                <img src={recommendedUsers.length > 0 ? recommendedUsers[0].avatar_url : null} alt="avatar"/>
                <h4>{recommendedUsers.length > 0 ? recommendedUsers[0].username : null}</h4>
                <button className="button no-margin">Follow</button>
            </div>
            <div className="user-to-follow">
                <img src={recommendedUsers.length > 0 ? recommendedUsers[1].avatar_url : null} alt="avatar"/>
                <h4>{recommendedUsers.length > 0 ? recommendedUsers[1].username : null}</h4>
                <button className="button no-margin">Follow</button>
            </div>
            <div className="user-to-follow">
                <img src={recommendedUsers.length > 0 ? recommendedUsers[2].avatar_url : null} alt="avatar"/>
                <h4>{recommendedUsers.length > 0 ? recommendedUsers[2].username : null}</h4>
                <button className="button no-margin">Follow</button>
            </div>
        </div>
    );
}

export default UsersToFollow;
