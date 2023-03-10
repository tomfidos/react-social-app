import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './views.css';
import Post from '../components/Post';

const LATEST_POSTS = 'https://akademia108.pl/api/social-app/post/latest';


const Home = (props) => {

    const [posts, setPosts] = useState([]);

    const getLatestPosts = (isLogged) => {
        axios.post(LATEST_POSTS).then(response => {
            if (isLogged) {
                console.log('logged user');
            }
            setPosts(response.data);
        });
    }

    useEffect(() => {
        getLatestPosts(props.userData.isLogged);
    }, [props.userData]);
    
    return (
        <div className="view">
            {posts.map(post => {
                return (<Post key={post.id} avatar={post.user.avatar_url} userName={post.user.username} postDate={post.created_at} postText={post.content} />);
            })}
        </div>
    );
}

export default Home;
