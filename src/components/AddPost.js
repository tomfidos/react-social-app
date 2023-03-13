import React, { useState, useEffect } from 'react';

import './Post.css';


const AddPost = (props) => {

    const [postContent, setPostContent] = useState('');
    const [currentPostCounter, setCurrentPostCounter] = useState(0);

    const readNewPostContent = (event) => {
        setPostContent(event.target.value);
    }

    const clearTextarea = (newPostCounter) => {
        if (newPostCounter > currentPostCounter) {
            setPostContent('');
            setCurrentPostCounter(currentPostCounter + 1);
        }
    }

    useEffect(() => {
        clearTextarea(props.postCounter)
    }, [props.postCounter]);

    return (
        <form className="form" onSubmit={(event) => props.onAddPost(event, postContent)}>
            <textarea className="input newPost" placeholder="Write a new post..." value={postContent} onChange={readNewPostContent} />
            <button type="submit" className="button addPostButton">add</button>
        </form>
    );
}

export default AddPost;
