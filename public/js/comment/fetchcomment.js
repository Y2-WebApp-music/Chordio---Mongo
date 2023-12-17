import { Comment } from "./comment.js";

export function fetchcomments() {
    $.ajax({
        url: '/fetchcomment',
        method: 'GET',
        success: function(data) {
            displayComments(data);
        },
        error: function(error) {
            console.error('Error fetching comments:', error);
        }
    });
}

function displayComments(comments) {
    const com = comments.map(comment => {
        return new Comment(
            comment.user_id,
            comment.post_id,
            comment.comment_id,
            comment.context,
            comment.commentdate,
            comment.username,
            comment.profile_image
        );
    });

    com.forEach(comment => {
        if(comment) {
            comment.addComment();
        }
    });
}
