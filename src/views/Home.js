import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Views.css';
import Post from '../components/Post';
import AddPost from '../components/AddPost';
import UsersToFollow from '../components/UsersToFollow';

const LATEST_POSTS = 'https://akademia108.pl/api/social-app/post/latest';
const ALL_FOLLOWED = 'https://akademia108.pl/api/social-app/follows/allfollows';
const RECOMMENDATIONS = 'https://akademia108.pl/api/social-app/follows/recommendations';


const Home = (props) => {

    const [posts, setPosts] = useState([]);
    const [postError, setPostError] = useState({
        isError: false,
        message: null,
    });
    const [allFollowedUsers, setAllFollowedUsers] = useState([]);
    const [recommendedUsers, setRecommendedUsers] = useState([]);

    const getLatestPosts = () => {
        axios
            .post(LATEST_POSTS)
            .then(response => setPosts(response.data))
            .catch(error => console.error(error));
    }

    const getAllFollowedUsers = () => {
        axios
            .post(ALL_FOLLOWED)
            .then(response => setAllFollowedUsers(response.data))
            .catch(error => console.error(error));
    }

    const getRecommendedUsers = () => {
        axios
            .post(RECOMMENDATIONS)
            .then(response => setRecommendedUsers(response.data))
            .catch(error => console.error(error));
    }

    useEffect(() => {
        if (props.userData.isLogged) {
            getAllFollowedUsers();
            getRecommendedUsers();
        }
        getLatestPosts();
    }, [props.userData.isLogged]);
    
    return (
        <div className="view">
            {props.userData.isLogged && <AddPost getLatestPosts={getLatestPosts} setPostError={setPostError} />}
            {props.userData.isLogged && postError.isError &&
                <div className="error">
                    <h4>Error:</h4>
                    <p>{postError.message}</p>
                </div>
            }
            {props.userData.isLogged && <UsersToFollow getLatestPosts={getLatestPosts} getAllFollowedUsers={getAllFollowedUsers} recommendedUsers={recommendedUsers} getRecommendedUsers={getRecommendedUsers} />}
            {posts.map(post => {
                return (<Post key={post.id} avatar={post.user.avatar_url} userName={post.user.username} postDate={post.created_at} postText={post.content} postId={post.id} isLogged={props.userData.isLogged} likes={post.likes} userId={props.userData.isLogged ? props.userData.id : null} authorId={post.user.id} getLatestPosts={getLatestPosts} setPostError={setPostError} allFollowedUsers={allFollowedUsers} getAllFollowedUsers={getAllFollowedUsers} getRecommendedUsers={getRecommendedUsers} />);
            })}
        </div>
    );
}

export default Home;
