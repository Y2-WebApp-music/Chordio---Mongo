function fetchUser() {
    $.ajax({
        url: '/follower',
        method: 'GET',
        success: function (data) {
            displayFollow(data, true);
        },
        error: function (error) {
            console.error('Error fetching posts:', error);
        }
    });

    $.ajax({
        url: '/following',
        method: 'GET',
        success: function (data) {
            displayFollow(data, false);
        },
        error: function (error) {
            console.error('Error fetching posts:', error);
        }
    });
}

function displayFollow(users, i) {
    users.forEach(user => {
        createUserBox(user, i);
    });
}

function createUserBox(user, i) {
    const userDiv = $('<div>').addClass('userprofile');
    userDiv.html(`
        <img src="data:image/png;base64,${user.profile_image}" class="follower-user-img" alt="">
        <div class="follower-user-information">
            <a>${user.username}</a>
            <p>${user.user_id}</p>
        </div>
    `);

    userDiv.on('click', function() {
        window.location.href='./otheruserprofile/'+user.user_id
    });

    if (i) {
        $('.Follower-grid').append(userDiv);
    } else {
        $('.Followed-grid').append(userDiv);
    }
}

// Call the fetchPosts function to load posts when the page loads
$(document).ready(function () {
    fetchUser()
});
