document.addEventListener("DOMContentLoaded", function() {
    const follow = document.querySelector('.follow-btn');
    const followBtn = document.querySelector('.action-btn');
    const text = document.querySelector('.btn-text');
    const otherId = Number(document.querySelector('.other-id').textContent);

    const user = window.userData;
    const curUser = window.curUserData;

    let isFollow = false;

    $.ajax({
        url: '/following',
        method: 'GET',
        success: function (data) {
            data.forEach(following => { 
                if (user.user_id === following.user_id) {
                    follow.classList.toggle('active');
                    followBtn.classList.toggle('active');

                    if (follow.classList[1]) {
                        text.textContent = 'Following';
                    } else {
                        text.textContent = 'Follow';
                    }

                    isFollow = true;
                }
            }) 
        },
        error: function (error) {
            console.error('Error fetching posts:', error);
        }
    });

    followBtn.addEventListener('click', function() {
        follow.classList.toggle('active');
        followBtn.classList.toggle('active');
        isFollow = !isFollow;

        if (follow.classList[1]) {
            text.textContent = 'Following';
        } else {
            text.textContent = 'Follow';
        }

        sendFollowToServer(otherId, curUser.user_id, isFollow);
    });

    const sendFollowToServer = (following_id, follower_id, isFollow) => {
        $.ajax({
            type: 'POST',
            url: '/follow-user',
            dataType: 'json',
            data: {
                following_id: following_id,
                follower_id: follower_id,
                isFollow: isFollow ? 1 : 0
            },
            success: function(response) {
                console.log(response);
            },
            error: function(errror) {
                console.error(errror);
            }
        });
    }
});
