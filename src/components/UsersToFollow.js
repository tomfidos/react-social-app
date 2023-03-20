import React from 'react';
import axios from 'axios';

import './UsersToFollow.css';

const FOLLOW = 'https://akademia108.pl/api/social-app/follows/follow';


const UsersToFollow = (props) => {

    const followUser = (event, leaderId) => {
        event.preventDefault();

        axios
            .post(FOLLOW, { leader_id: leaderId })
            .then(() => {
                props.getRecommendedUsers();
                props.getAllFollowedUsers();
                props.getLatestPosts();
            })
            .catch(error => console.error(error));
    }

    return (
        <div className="form flex-row">
            {props.recommendedUsers.length >= 1 &&
                <div className="user-to-follow">
                    <img src={props.recommendedUsers[0].avatar_url} alt="avatar" />
                    <h4>{props.recommendedUsers[0].username}</h4>
                    <button className="button no-margin" onClick={event => followUser(event, props.recommendedUsers[0].id)}>Follow</button>
                </div>
            }
            {props.recommendedUsers.length >= 2 &&
                <div className="user-to-follow">
                    <img src={props.recommendedUsers[1].avatar_url} alt="avatar" />
                    <h4>{props.recommendedUsers[1].username}</h4>
                    <button className="button no-margin" onClick={event => followUser(event, props.recommendedUsers[1].id)}>Follow</button>
                </div>
            }
            {props.recommendedUsers.length >= 3 &&
                <div className="user-to-follow">
                    <img src={props.recommendedUsers[2].avatar_url} alt="avatar" />
                    <h4>{props.recommendedUsers[2].username}</h4>
                    <button className="button no-margin" onClick={event => followUser(event, props.recommendedUsers[2].id)}>Follow</button>
                </div>
            }
        </div>
    );
}

export default UsersToFollow;
