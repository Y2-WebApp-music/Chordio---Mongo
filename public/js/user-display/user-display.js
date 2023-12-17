import User from './user-class.js';

export function getCurrentUser() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: '/user/info',
            method: 'GET',
            success: function (data) {
                const i = data[0];
                const user = new User(i.user_id, i.username, i.email, i.profile_image, i.num_posts, i.num_chords);
                resolve(user);  
            },
            error: function (error) {
                reject('Error fetching user info:', error);
            }
        });
    });
}


function displayUser(user) {
    if (user.profile_image != null) {
        if (document.querySelector('.user-img')) {
            const userprofileElements = document.querySelectorAll('.user-img');

            const base64Image = 'data:image/png;base64,' + user.profile_image;

            userprofileElements.forEach(function(userprofileElement) {
                userprofileElement.src = base64Image;
            });
        }
    }

    if (user.profile_image != null) {
        if (document.querySelector('.my-img') && document.querySelector('.user-icon')) {
            const userprofileIconElement = document.querySelector('.user-icon');
            const userprofileElement = document.querySelector('.my-img');

            const base64Image = 'data:image/png;base64,' + user.profile_image;

            userprofileIconElement.src = base64Image;
            userprofileElement.src = base64Image;
        }
    }

    if (document.querySelector('.me')) {
        const usernameElements = document.querySelectorAll('.me');

        usernameElements.forEach(function(usernameElement) {
            usernameElement.textContent = user.username;
        });
    }

    if (document.querySelector('.id')) {
        const userIdElements = document.querySelectorAll('.id');

        userIdElements.forEach(function(userIdElement) {
            userIdElement.textContent = user.user_id;
        });
    }

    if (document.querySelector('.email')) {
        const userEmailElements = document.querySelectorAll('.email');

        userEmailElements.forEach(function(userEmailElement) {
            userEmailElement.textContent = user.email;
        });
    }

    if (document.querySelector('.numpost')) {
        const userPostNumElements = document.querySelectorAll('.numpost');

        userPostNumElements.forEach(function(userPostNumElement) {
            userPostNumElement.textContent = user.num_posts;
        });
    }

    if (document.querySelector('.numchord')) {
        const userChordNumElements = document.querySelectorAll('.numchord');

        userChordNumElements.forEach(function(userChordNumElement) {
            userChordNumElement.textContent = user.num_chords;
        });
    }

    if(document.querySelector('.user-input')) {
        const inputUsernameElement = document.querySelector('.username'); 
        const inputUserIdElement = document.querySelector('.email');
    
        inputUsernameElement.value = user.username;
        inputUserIdElement.value = user.email;
    }
}


// Call the getCurrentUser function when the page loads
$(document).ready(function () {
    getCurrentUser()
    .then(function(user) {
        displayUser(user);
    })
    .catch(function(error) {
        console.error(error);
    });
});