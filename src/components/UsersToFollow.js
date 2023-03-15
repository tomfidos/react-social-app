import React from 'react';

import './UsersToFollow.css';

const UsersToFollow = (props) => {

    return (
        <div className="form flex-row">
            <div className="user-to-follow">
                <img src={props.avatar} alt="avatar"/>
                <h5>{props.userName}</h5>
                <button className="button no-margin">Follow</button>
            </div>
            <div className="user-to-follow">
                <img src={props.avatar} alt="avatar"/>
                <h5>{props.userName}</h5>
                <button className="button no-margin">Follow</button>
            </div>
            <div className="user-to-follow">
                <img src={props.avatar} alt="avatar"/>
                <h5>{props.userName}</h5>
                <button className="button no-margin">Follow</button>
            </div>
        </div>
    );
}

export default UsersToFollow
