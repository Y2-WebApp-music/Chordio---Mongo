export class Post {
    constructor(post_id, title, content, img1, img2, img3, img4, postdate, likes , userid, username, profile_image, category, tag, isLike, isSave) {
        this.post_id = post_id;
        this.title = title;
        this.content = content;
        this.img1 = img1;
        this.img2 = img2;
        this.img3 = img3;
        this.img4 = img4;
        this.postdate = postdate;
        this.likes = likes;
        this.userid = userid;
        this.username = username;
        this.profile_image = profile_image;
        this.category = category;
        this.tag = tag;
        this.isLike = isLike;
        this.isSave = isSave;
    }

    toggleLike(postElement, popupPost) {
        const likeButton = postElement.find('.like');
        const popLikeButtun = popupPost.find('.like');

        likeButton.on('click', () => {
            if(!this.isLike) {
                this.isLike = true;

                likeButton.toggleClass('like-button animated active');
                popLikeButtun.toggleClass('like-button active');
            } else {
                this.isLike = false;

                likeButton.toggleClass('like-button active');
                popLikeButtun.toggleClass('like-button active');
            }
            sendLikeToServer(this.post_id, this.isLike);
        });

        popLikeButtun.on('click', () => {
            if(!this.isLike) {
                this.isLike = true;

                popLikeButtun.toggleClass('like-button animated active');
                likeButton.toggleClass('like-button active');
            } else {
                this.isLike = false;

                popLikeButtun.toggleClass('like-button active');
                likeButton.toggleClass('like-button active');
            }
            sendLikeToServer(this.post_id, this.isLike);
        });

        const sendLikeToServer = (post_id, isIncrementing) => {
            $.ajax({
                type: 'POST',
                url: '/likes/post',
                dataType: 'json',
                data: {
                    post_id: post_id,
                    isIncrementing: isIncrementing ? 1 : 0
                },
                success: function(response) {
                    console.log(response);
                },
                error: function(errror) {
                    console.error(errror);
                }
            });
        }
    }

    toggleSave(postElement, popupPost) {
        const saveButton = postElement.find('.save');
        const popSaveButtun = popupPost.find('.save');

        saveButton.on('click', () => {
            if(!this.isSave) {
                this.isSave = true;

                saveButton.toggleClass('save-button animated active');
                popSaveButtun.toggleClass('save-button active');
            } else {
                this.isSave = false;

                saveButton.toggleClass('save-button active');
                popSaveButtun.toggleClass('save-button active');
            }

            sendSaveToServer(this.post_id, this.isSave);
        });

        popSaveButtun.on('click', () => {
            if(!this.isSave) {
                this.isSave = true;

                popSaveButtun.toggleClass('save-button animated active');
                saveButton.toggleClass('save-button active');
            } else {
                this.isSave = false;

                popSaveButtun.toggleClass('save-button active');
                saveButton.toggleClass('save-button active');
            }

            sendSaveToServer(this.post_id, this.isSave);
        });

        const sendSaveToServer = (post_id, isIncrementing) => {
            $.ajax({
                type: 'POST',
                url: '/saves/post',
                dataType: 'json',
                data: {
                    post_id: post_id,
                    isIncrementing: isIncrementing ? 1 : 0
                },
                success: function(response) {
                    console.log(response);
                },
                error: function(errror) {
                    console.error(errror);
                }
            });
        }
    }
}