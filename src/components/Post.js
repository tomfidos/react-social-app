import React from 'react';

import './Post.css';

const Post = () => {

    return(
        <div className="post">
            <img src="" alt="avatar"/>
            <p className="name"></p>
            <p className="messageDate"></p>
            <p className="message"></p>
            <p className="likeNumber"></p>
        </div>
    );

}

export default Post;
