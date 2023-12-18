import { Post } from './post.js';
import { PopupPost } from './popupPost.js';

export class RegularPost extends Post {
    // Function to create a post element
    createPostElement() {
        const postDiv = $('<div>').addClass('post');
        postDiv.html(`
            <div class="post-user-information">
                <a href="/otheruserprofile/${this.userid}">
                    <img
                        src="data:image/png;base64,${this.profile_image}" class="user-icon-post prevent-select">
                </a>
                <div class="post-user-text">
                    <a href="/otheruserprofile/${this.userid}" class="post-username">${this.username}</a>
                    <p class="post-date">${this.postdate}</p>
                </div>
            </div>
            <div class="post-content">
                <div class="post-title">${this.title}</div>
                <div class="post-detail-text">${this.content}</div>
                <div class="post-img prevent-select">
                    <img src="data:image/png;base64,${this.img1}" alt="Image 1">
                    <img src="data:image/png;base64,${this.img2}" alt="Image 2">
                    <img src="data:image/png;base64,${this.img3}" alt="Image 3">
                    <img src="data:image/png;base64,${this.img4}" alt="Image 4">
                </div>
            </div>
            <div class="post-interact prevent-select">
                <div class="post-interact-btn like">
                    <svg xmlns="http://www.w3.org/2000/svg" id="like-icon" height="1.3em" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                    <p> Like </p>
                </div>
                <div class="post-interact-btn comment-show">
                    <svg xmlns="http://www.w3.org/2000/svg" id="comment-icon" height="1.3em" viewBox="0 0 512 512"><path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z"/></svg>
                    <p>Comment</p>
                </div>
                <div class="post-interact-btn save">
                    <svg xmlns="http://www.w3.org/2000/svg" id="save" height="1.3em" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>
                    <p> Save </p>
                </div>
            </div>
        `)
        return postDiv;
    }

    handleCommentClick() {
        const container = $('.pop-post-container');

        // Create an instance of PopupPost
        const popupPost = new PopupPost(
            this.post_id,
            this.title,
            this.content,
            this.img1,
            this.img2,
            this.img3,
            this.img4,
            this.postdate,
            this.likes,
            this.userid,
            this.username,
            this.profile_image,
            this.category,
            this.tag,
            this.isLike,
            this.isSave
        );

        // Create the popup post element
        return popupPost.createPostElement()
        .then((popupPostElement) => {
            // Append the popup post element to the container
            container.append(popupPostElement);

            return { popupPostElement };
        })
        .catch((error) => {
            console.error(error);
        });
    }

    async fetchPost() {
        // Create the post element
        const postElement = this.createPostElement();

        $('.post-container').append(postElement);

        // Find the comment button within the post element
        const commentButton = postElement.find('.comment-show');

        const { popupPostElement } = await this.handleCommentClick();
        popupPostElement.hide();

        commentButton.on('click', () => {
            popupPostElement.toggle();
        });

        if(this.isLike) {
            postElement.find('.like').toggleClass('like-button active');
        }

        if(this.isSave) {
            postElement.find('.save').toggleClass('save-button active');
        }

        this.toggleLike(postElement, popupPostElement);
        this.toggleSave(postElement, popupPostElement);
    }
}