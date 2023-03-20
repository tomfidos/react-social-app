import React from 'react';
import axios from 'axios';

import './Post.css';
import { getPostGradeDirection, getFollowDirection } from '../js/helpers';

const LIKE_POST = 'https://akademia108.pl/api/social-app/post/like';
const DISLIKE_POST = 'https://akademia108.pl/api/social-app/post/dislike';
const UNFOLLOW = 'https://akademia108.pl/api/social-app/follows/disfollow';
const DELETE_POST = 'https://akademia108.pl/api/social-app/post/delete';

const Post = (props) => {

    const togglePostGradeDirection = (event, likes, userId, postId) => {
        event.preventDefault();

        if (getPostGradeDirection(likes, userId) === 'Dislike') {
            axios
                .post(DISLIKE_POST, {post_id: postId})
                .then(() => {
                    getPostGradeDirection(likes, userId);
                    props.getLatestPosts();
                })
                .catch(error => console.error(error));
        } else {
            axios
                .post(LIKE_POST, {post_id: postId})
                .then(() => {
                    getPostGradeDirection(likes, userId);
                    props.getLatestPosts();
                })
                .catch(error => console.error(error));
        }
    }

    const unfollowUser = (event, authorId, allFollowedUsers) => {
        event.preventDefault();

        axios
            .post(UNFOLLOW, {leader_id: authorId})
            .then(() => {
                getFollowDirection(authorId, allFollowedUsers);
                props.getLatestPosts();
                props.getAllFollowedUsers();
                props.getRecommendedUsers();
            })
            .catch(error => console.error(error));
    }

    const deletePost = (event, postId) => {
        event.preventDefault();

        axios
            .post(DELETE_POST, {post_id: parseInt(postId)})
            .then(() => {
                props.setPostError({
                    isError: false,
                    message: null,
                });
                props.getLatestPosts();
            })
            .catch(error => {
                console.error(error);
                props.setPostError({
                    isError: true,
                    message: error.message,
                });
            });
    }

    return(
        <div className="post">
            <img src={props.avatar} alt="avatar"/>
            <p className="name">{props.userName}</p>
            <p className="messageDate">{props.postDate.substr(0, 10)}</p>
            <p className="message">{props.postText}</p>
            {props.isLogged && props.authorId === props.userId &&
                <button className="button deletePost" onClick={(event) => deletePost(event, props.postId)}>Delete post</button>
            }
            {props.isLogged && props.authorId !== props.userId &&
                <button className="button deletePost" onClick={(event) => unfollowUser(event, props.authorId, props.allFollowedUsers)}>{getFollowDirection(props.authorId, props.allFollowedUsers)}</button>
            }
            {props.isLogged &&
                <button className="button likePost" onClick={(event) => togglePostGradeDirection(event, props.likes, props.userId, props.postId)}>{getPostGradeDirection(props.likes, props.userId)}</button>
            }
            <p className="likeNumber">{props.likes.length}</p>
        </div>
    );

}

export default Post;
