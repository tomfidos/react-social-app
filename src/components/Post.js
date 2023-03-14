import React from 'react';

import './Post.css';

const Post = (props) => {

    return(
        <div className="post">
            <img src={props.avatar} alt="avatar"/>
            <p className="name">{props.userName}</p>
            <p className="messageDate">{props.postDate.substr(0, 10)}</p>
            <p className="message">{props.postText}</p>
            {props.isLogged && props.authorId === props.userId &&
                <button className="button deletePost" onClick={(event) => props.onPostDelete(event, props.postId)}>Delete post</button>
            }
            {props.isLogged &&
                <button className="button likePost" onClick={(event) => props.onTogglePostGrade(event, props.likes, props.userId, props.postId)}>{props.postGradeDirection(props.likes, props.userId)}</button>
            }
            <p className="likeNumber">{props.likes.length}</p>
        </div>
    );

}

export default Post;
