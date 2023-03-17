import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './UsersToFollow.css';

const RECOMMENDATIONS = 'https://akademia108.pl/api/social-app/follows/recommendations';
const FOLLOW = 'https://akademia108.pl/api/social-app/follows/follow';


const UsersToFollow = () => {

    const [recommendedUsers, setRecommendedUsers] = useState([]);

    const getRecommendedUsers = () => {
        axios
            .post(RECOMMENDATIONS)
            .then(response => setRecommendedUsers(response.data))
            .catch(error => console.error(error));
    }

    const followUser = (event, leaderId) => {
        event.preventDefault();

        axios
            .post(FOLLOW, { leader_id: leaderId })
            .then()
            .catch(error => console.error(error));
    }

    useEffect(() => {
        getRecommendedUsers();
    }, []);

    return (
        <div className="form flex-row">
            {recommendedUsers.length >= 1 &&
                <div className="user-to-follow">
                    <img src={recommendedUsers[0].avatar_url} alt="avatar" />
                    <h4>{recommendedUsers[0].username}</h4>
                    <button className="button no-margin" onClick={event => followUser(event, recommendedUsers[0].id)}>Follow</button>
                </div>
            }
            {recommendedUsers.length >= 2 &&
                <div className="user-to-follow">
                    <img src={recommendedUsers[1].avatar_url} alt="avatar" />
                    <h4>{recommendedUsers[1].username}</h4>
                    <button className="button no-margin" onClick={event => followUser(event, recommendedUsers[1].id)}>Follow</button>
                </div>
            }
            {recommendedUsers.length >= 3 &&
                <div className="user-to-follow">
                    <img src={recommendedUsers[2].avatar_url} alt="avatar" />
                    <h4>{recommendedUsers[2].username}</h4>
                    <button className="button no-margin" onClick={event => followUser(event, recommendedUsers[2].id)}>Follow</button>
                </div>
            }
        </div>
    );
}

export default UsersToFollow;
