import React from 'react';

import './Post.css';

const Post = (props) => {

    return(
        <div className="post">
            <img src={props.avatar} alt="avatar"/>
            <p className="name">{props.userName}</p>
            <p className="messageDate">{props.postDate.substr(0, 10)}</p>
            <p className="message">{props.postText}</p>
            <p className="likeNumber"></p>
        </div>
    );

}

export default Post;
