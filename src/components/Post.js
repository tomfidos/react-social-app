import React from 'react';
import axios from 'axios';

import './Post.css';

const LIKE_POST = 'https://akademia108.pl/api/social-app/post/like';
const DISLIKE_POST = 'https://akademia108.pl/api/social-app/post/dislike';
const FOLLOW = 'https://akademia108.pl/api/social-app/follows/follow';
const UNFOLLOW = 'https://akademia108.pl/api/social-app/follows/disfollow';

const Post = (props) => {

    const getPostGradeDirection = (likes, userId) => {
        const likeFromUser = likes.filter(like => like.id === userId);
        if (likeFromUser.length > 0) {
            return 'Dislike';
        } else {
            return 'Like';
        }
    }

    const togglePostGradeDirection = (event, likes, userId, postId, getLatestPostsFunction) => {
        event.preventDefault();

        if (getPostGradeDirection(likes, userId) === 'Dislike') {
            axios
                .post(DISLIKE_POST, {post_id: postId})
                .then(() => {
                    getPostGradeDirection(likes, userId);
                    getLatestPostsFunction();
                })
                .catch(error => console.error(error));
        } else {
            axios
                .post(LIKE_POST, {post_id: postId})
                .then(() => {
                    getPostGradeDirection(likes, userId);
                    getLatestPostsFunction();
                })
                .catch(error => console.error(error));
        }
    }

    const followOrUnfollowUser = (event, authorId, getLatestPostsFunction, allFollowedUsers) => {
        event.preventDefault();

        if (getFollowDirection(authorId, allFollowedUsers) === 'Follow') {
            axios
                .post(FOLLOW, {leader_id: authorId})
                .then(() => {
                    getFollowDirection(authorId, allFollowedUsers);
                    getLatestPostsFunction();
                })
                .catch(error => console.error(error));
        } else {
            axios
                .post(UNFOLLOW, {leader_id: authorId})
                .then(() => {
                    getFollowDirection(authorId, allFollowedUsers);
                    getLatestPostsFunction();
                })
                .catch(error => console.error(error));
        }
    }

    const getFollowDirection = (authorId, allFollowedUsers) => {
        const followedAuthor = allFollowedUsers.filter(user => user.id === authorId);
        if (followedAuthor.length > 0) {
            return 'Unfollow';
        } else {
            return 'Follow';
        }
    }

    return(
        <div className="post">
            <img src={props.avatar} alt="avatar"/>
            <p className="name">{props.userName}</p>
            <p className="messageDate">{props.postDate.substr(0, 10)}</p>
            <p className="message">{props.postText}</p>
            {props.isLogged && props.authorId === props.userId &&
                <button className="button deletePost" onClick={(event) => props.onPostDelete(event, props.postId)}>Delete post</button>
            }
            {props.isLogged && props.authorId !== props.userId &&
                <button className="button deletePost" onClick={(event) => followOrUnfollowUser(event, props.authorId, props.getLatestPostsFunction, props.allFollowedUsers)}>{getFollowDirection(props.authorId, props.allFollowedUsers)}</button>
            }
            {props.isLogged &&
                <button className="button likePost" onClick={(event) => togglePostGradeDirection(event, props.likes, props.userId, props.postId, props.getLatestPostsFunction)}>{getPostGradeDirection(props.likes, props.userId)}</button>
            }
            <p className="likeNumber">{props.likes.length}</p>
        </div>
    );

}

export default Post;
