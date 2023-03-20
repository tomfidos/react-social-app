const getPostGradeDirection = (likes, userId) => {
    const likeFromUser = likes.filter(like => like.id === userId);
    if (likeFromUser.length > 0) {
        return 'Dislike';
    } else {
        return 'Like';
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

export { getPostGradeDirection, getFollowDirection };
