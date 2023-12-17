export class Comment {
    constructor(user_id, post_id, comment_id, context, commentdate, username, profile_image) {
        this.user_id = user_id;
        this.post_id = post_id;
        this.comment_id = comment_id;
        this.context = context;
        this.commentdate = commentdate;
        this.username = username;
        this.profile_image = profile_image;
    }

    createCommentElement() {
        const comDiv = $('<div>').addClass('comment-post');
        comDiv.html(`
            <img src="data:image/png;base64,${this.profile_image}" class="comment-user-icon prevent-select">
            <div class="comment-context">
                <p class="comment-username">${this.username}</p>
                <div class="comment-detail">
                    ${this.context}
                </div>
            </div>
        `);
        return comDiv;
    }

    addComment() {
        const comDiv = this.createCommentElement();
        $(`.comment-post-container.${this.post_id}`).append(comDiv);
    }
}