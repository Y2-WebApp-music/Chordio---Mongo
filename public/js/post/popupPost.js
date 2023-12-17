import { Post } from './post.js';
import { getCurrentUser } from '../user-display/user-display.js';
import { fetchcomments } from '../comment/fetchcomment.js';

export class PopupPost extends Post {

    // Function to create a popup post element
    createPostElement() {
        return new Promise((resolve, reject) => {
            getCurrentUser().then((user) => {
                const cur_user = user;
    
                const postDiv = $('<div>').addClass('comment-fill').attr('id', this.post_id);
                postDiv.html(`
                    <div class="comment-container">
                        <div class="comment-background">
                            <div class="com-left prevent-select">
                                <div class="com-post-img">
                                    <div class="post-img">
                                        <div class="Slide-img">
                                            <img src="data:image/png;base64,${this.img1}">
                                        </div>
                                        <div class="Slide-img">
                                            <img src="data:image/png;base64,${this.img2}">
                                        </div>
                                        <div class="Slide-img">
                                            <img src="data:image/png;base64,${this.img3}">
                                        </div>
                                        <div class="Slide-img">
                                            <img src="data:image/png;base64,${this.img4}">
                                        </div>
                                    </div>
                                </div>
                                <div class="slide-button">
                                    <svg class="slide-left" xmlns="http://www.w3.org/2000/svg" height="2.4em" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                                    <svg class="slide-right" xmlns="http://www.w3.org/2000/svg" height="2.4em" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
                                </div>
                            </div>
                            <div class="com-right">
                                <div class="com-post-own">
                                    <img src="data:image/png;base64,${this.profile_image}"" class="com-own-icon prevent-select">
                                    <div class="com-own-icon-text">
                                        <p class="com-own-username">${this.username}</p>
                                        <p class="com-own-date prevent-select">${this.postdate}</p>
                                    </div>
                                </div>
                                <div class="scroll-com">
                                    <div class="com-post-title">${this.title}</div>
                                    <div class="com-post-detail">
                                        ${this.content}    
                                    </div>
                                    <div class="post-interact prevent-select">
                                        <div class="post-interact-btn like">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="like-icon" height="1.3em" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                                            <p> Like </p>
                                        </div>
                                        <div class="post-interact-btn save">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="save" height="1.3em" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>
                                            <p> Save </p>
                                        </div>
                                    </div>

                                    <div class="comment-post-container ${this.post_id}">
                                        
                                    </div>
                                    
                                </div>
                                <form id="commentForm-${this.post_id}" name="commentForm">
                                    <div class="com-user-input prevent-select">
                                        <img src="data:image/png;base64,${cur_user.profile_image}" class="com-user-icon">
                                        <input type="text" name="context" class="com-input" placeholder="Write something..." maxlength="10000">
                                        <button type="submit" class="post-com-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="send-com-btn" height="1.6em" viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="close-comment"  height="2em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </div>
                `)
    
                const allImagesNull = postDiv.find('.Slide-img img').toArray().every(img => $(img).attr('src') === 'data:image/png;base64,null');
                
                if (allImagesNull) {
                    // Add class 'no-photos' to the specified elements
                    postDiv.find('.com-left, .comment-container, .comment-background').addClass('no-photos');
            
                    // Remove .Slide-img
                    postDiv.find('.Slide-img').remove();
            
                    // Set display of .slide-button to none
                    postDiv.find('.slide-button').css('display', 'none');
                }
    
                postDiv.find('.Slide-img img').each(function() {
                    if ($(this).attr('src') === 'data:image/png;base64,null') {
                    // Remove the parent .Slide-img element
                    $(this).closest('.Slide-img').remove();
                    }
                });
    
                // Comment slide Photo
                var slideIndex = 1;
                showDivs(slideIndex);
    
                function plusDivs(n) {
                    showDivs((slideIndex += n));
                }
    
                function showDivs(n) {
                    var i;
                    var x = postDiv.find('.Slide-img').toArray();
                    if (x.length === 0) {
                        // No elements with class .Slide-img found, do nothing or handle this case as needed.
                        return;
                    }
    
                    if (n > x.length) {
                        slideIndex = 1;
                    }
                    if (n < 1) {
                        slideIndex = x.length;
                    }
                    for (i = 0; i < x.length; i++) {
                        x[i].style.display = "none";
                    }
                    x[slideIndex - 1].style.display = "block";
                }
    
                const nextImage = postDiv.find('.slide-right').on('click', function() {
                    plusDivs(1)
                });
    
                const prevImage = postDiv.find('.slide-left').on('click', function() {
                    plusDivs(-1)
                });
    
                postDiv.on('click', function (event) {
                    if (!$(event.target).closest('.comment-background').length) {
                        postDiv.hide();
                    }
                });
    
                if(this.isLike) {
                    postDiv.find('.like').toggleClass('like-button active');
                }
    
                if(this.isSave) {
                    postDiv.find('.save').toggleClass('save-button active');
                }

                const commentForm = postDiv.find(`#commentForm-${this.post_id}`);
                const postId = this.post_id;

                commentForm.on('submit', function (event) {
                    event.preventDefault();

                    const commentInput = commentForm.find('input[name="context"]');
                    const commentText = commentInput.val();

                    // Perform the mutation by sending the comment to the server
                    handleCommentMutation(commentText, postId)
                        .then((result) => {
                            console.log(result);
                            commentInput.val('');

                            $('.comment-post-container').empty();
                            fetchcomments();
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                });
    
                resolve(postDiv);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

// Function to handle comment mutation (replace this with your actual mutation logic)
function handleCommentMutation(commentText, postId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/create-comment/${postId}`,
            method: 'POST',
            data: { context: commentText },
            success: function(response) {
                resolve(response);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}