import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Views.css';
import Post from '../components/Post';
import AddPost from '../components/AddPost';
import UsersToFollow from '../components/UsersToFollow';

const LATEST_POSTS = 'https://akademia108.pl/api/social-app/post/latest';
const ADD_POST = 'https://akademia108.pl/api/social-app/post/add';
const DELETE_POST = 'https://akademia108.pl/api/social-app/post/delete';
const ALL_FOLLOWED = 'https://akademia108.pl/api/social-app/follows/allfollows';


const Home = (props) => {

    const [posts, setPosts] = useState([]);
    const [newPostCounter, setNewPostCounter] = useState(0);
    const [deletedPostCounter, setDeletedPostCounter] = useState(0);
    const [postError, setPostError] = useState({
        isError: false,
        message: null,
    });
    const [allFollowedUsers, setAllFollowedUsers] = useState([]);

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

    const getAllFollowedUsers = () => {
        axios
            .post(ALL_FOLLOWED)
            .then(response => setAllFollowedUsers(response.data))
            .catch(error => console.error(error));
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

    useEffect(() => {
        if (props.userData.isLogged) {
            getAllFollowedUsers();
        }
    }, [props.userData.isLogged]);
    
    return (
        <div className="view">
            {props.userData.isLogged && <AddPost onAddPost={addNewPost} postCounter={newPostCounter} />}
            {props.userData.isLogged && postError.isError &&
                <div className="error">
                    <h4>Error:</h4>
                    <p>{postError.message}</p>
                </div>
            }
            {props.userData.isLogged && <UsersToFollow />}
            {posts.map(post => {
                return (<Post key={post.id} avatar={post.user.avatar_url} userName={post.user.username} postDate={post.created_at} postText={post.content} postId={post.id} onPostDelete={deletePost} isLogged={props.userData.isLogged} likes={post.likes} userId={props.userData.isLogged ? props.userData.id : null} authorId={post.user.id} getLatestPostsFunction={getLatestPosts} allFollowedUsers={allFollowedUsers} />);
            })}
        </div>
    );
}

export default Home;
