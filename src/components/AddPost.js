import React, { useState } from 'react';
import axios from 'axios';

import './Post.css';

const ADD_POST = 'https://akademia108.pl/api/social-app/post/add';


const AddPost = (props) => {

    const [postContent, setPostContent] = useState('');

    const readNewPostContent = (event) => {
        setPostContent(event.target.value);
    }

    const addNewPost = (event) => {
        event.preventDefault();

        axios
            .post(ADD_POST, {content: postContent})
            .then(() => {
                props.setPostError({
                    isError: false,
                    message: null,
                });
                setPostContent('');
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

    return (
        <form className="form" onSubmit={addNewPost}>
            <textarea className="input newPost" placeholder="Write a new post..." value={postContent} onChange={readNewPostContent} />
            <button type="submit" className="button addPostButton">add</button>
        </form>
    );
}

export default AddPost;
