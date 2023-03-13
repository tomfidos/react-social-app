import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Views.css';
import Post from '../components/Post';
import AddPost from '../components/AddPost';

const LATEST_POSTS = 'https://akademia108.pl/api/social-app/post/latest';
const ADD_POST = 'https://akademia108.pl/api/social-app/post/add';


const Home = (props) => {

    const [posts, setPosts] = useState([]);
    const [newPostCounter, setNewPostCounter] = useState(0);
    const [addPostError, setAddPostError] = useState({
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
                setAddPostError({
                    isError: false,
                    message: null,
                });
                setNewPostCounter(newPostCounter + 1);
            })
            .catch(error => {
                console.error(error);
                setAddPostError({
                    isError: true,
                    message: error.message,
                });
            });
    }

    useEffect(() => {
        getLatestPosts();
    }, [props.userData.isLogged]);

    useEffect(() => {
        getLatestPosts();
    }, [newPostCounter]);
    
    return (
        <div className="view">
            {props.userData.isLogged && <AddPost onAddPost={addNewPost} postCounter={newPostCounter} />}
            {props.userData.isLogged && addPostError.isError &&
                <div className="error">
                    <h4>Error:</h4>
                    <p>{addPostError.message}</p>
                </div>
            }
            {posts.map(post => {
                return (<Post key={post.id} avatar={post.user.avatar_url} userName={post.user.username} postDate={post.created_at} postText={post.content} />);
            })}
        </div>
    );
}

export default Home;
