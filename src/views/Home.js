import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Views.css';
import Post from '../components/Post';
import AddPost from '../components/AddPost';

const LATEST_POSTS = 'https://akademia108.pl/api/social-app/post/latest';
const ADD_POST = 'https://akademia108.pl/api/social-app/post/add';
const DELETE_POST = 'https://akademia108.pl/api/social-app/post/delete';
const LIKE_POST = 'https://akademia108.pl/api/social-app/post/like';
const DISLIKE_POST = 'https://akademia108.pl/api/social-app/post/dislike';


const Home = (props) => {

    const [posts, setPosts] = useState([]);
    const [newPostCounter, setNewPostCounter] = useState(0);
    const [deletedPostCounter, setDeletedPostCounter] = useState(0);
    const [postError, setPostError] = useState({
        isError: false,
        message: null,
    });

    const getLatestPosts = () => {
        axios.post(LATEST_POSTS).then(response => {
            setPosts(response.data);
        });
    }

    const addNewPost = (event, postContent) => {
        event.preventDefault();

        axios
            .post(ADD_POST, {content: postContent})
            .then(() => {
                setPostError({
                    isError: false,
                    message: null,
                });
                setNewPostCounter(newPostCounter + 1);
            })
            .catch(error => {
                console.error(error);
                setPostError({
                    isError: true,
                    message: error.message,
                });
            });
    }

    const deletePost = (event, postId) => {
        event.preventDefault();

        axios
            .post(DELETE_POST, {post_id: parseInt(postId)})
            .then(() => {
                setPostError({
                    isError: false,
                    message: null,
                });
                setDeletedPostCounter(deletedPostCounter + 1)
            })
            .catch(error => {
                console.error(error);
                setPostError({
                    isError: true,
                    message: error.message,
                });
            });
    }

    const getPostGradeDirection = (likes, userId) => {
        const likeFromUser = likes.filter(like => like.id === userId);
        if (likeFromUser.length > 0) {
            return 'Dislike';
        } else {
            return 'Like';
        }
    }

    const togglePostGradeDirection = (event, likes, userId, postId) => {
        event.preventDefault();

        if (getPostGradeDirection(likes, userId) === 'Dislike') {
            axios
                .post(DISLIKE_POST, {post_id: postId})
                .then(() => {
                    getPostGradeDirection(likes, userId);
                    getLatestPosts();
                })
                .catch(error => console.error(error));
        } else {
            axios
                .post(LIKE_POST, {post_id: postId})
                .then(() => {
                    getPostGradeDirection(likes, userId);
                    getLatestPosts();
                })
                .catch(error => console.error(error));
        }
    }

    useEffect(() => {
        getLatestPosts();
    }, [props.userData.isLogged]);

    useEffect(() => {
        getLatestPosts();
    }, [newPostCounter]);

    useEffect(() => {
        getLatestPosts();
    }, [deletedPostCounter]);
    
    return (
        <div className="view">
            {props.userData.isLogged && <AddPost onAddPost={addNewPost} postCounter={newPostCounter} />}
            {props.userData.isLogged && postError.isError &&
                <div className="error">
                    <h4>Error:</h4>
                    <p>{postError.message}</p>
                </div>
            }
            {posts.map(post => {
                return (<Post key={post.id} avatar={post.user.avatar_url} userName={post.user.username} postDate={post.created_at} postText={post.content} postId={post.id} onPostDelete={deletePost} isLogged={props.userData.isLogged} likes={post.likes} postGradeDirection={getPostGradeDirection} userId={props.userData.isLogged ? props.userData.id : null} onTogglePostGrade={togglePostGradeDirection} />);
            })}
        </div>
    );
}

export default Home;
