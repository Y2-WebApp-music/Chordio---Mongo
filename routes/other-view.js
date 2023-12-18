const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/otheruserprofile/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;

        if (user_id == req.session.user._id) {
            res.redirect('/userprofile');
            return;
        }

        const config = {
            headers: {
              Cookie: req.headers.cookie, // Include the session cookie from the request's headers
            },
        };

        // Fetch chord data
        const userData = await axios.get(`http://localhost:3000/otheruser/${user_id}`, config);
        const user = userData.data;

        // Fetch user data
        const curUserData = await axios.get(`http://localhost:3000/user/info`, config);
        const curUser = curUserData.data;

        // Generate HTML response using template literals
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">

                <link rel='stylesheet' href='/css/otheruserprofile.css'>
                <link rel='stylesheet' href='/css/global.css'>
                <link rel='stylesheet' href='/css/post-display.css'>
                <script defer src="/js/global.js"></script>
                <script defer src="/js/otheruserprofile.js" type="module"></script>

                <script defer src="/js/post/post.js" type="module"></script>
                <script defer src="/js/post/popupPost.js" type="module"></script>
                <script defer src="/js/post/regularPost.js" type="module"></script>
                <script defer src="/js/post/fetchpost.js " type="module"></script>

                <script defer src="/js/comment/comment.js " type="module"></script>
                <script defer src="/js/comment/fetchcomment.js " type="module"></script>

                <script defer src="/js/chord/chord-class.js" type="module"></script>
                <script defer src="/js/chord/fetchchord.js " type="module"></script>

                <script>
                    const homeValue = '${user._id}'; // This will insert the value from the server-side into the client-side JavaScript

                    // Embed user data in a global variable
                    var userData = ${JSON.stringify(user)};
                    var curUserData = ${JSON.stringify(curUser)};
                </script>

                <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;1,500;1,700;1,900&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=Anuphan:wght@100;200;300;400;500;600;700&family=Raleway:ital,wght@0,300;1,500;1,700;1,900&display=swap" rel="stylesheet">

                <title>${user.username}</title>
            </head>
            <body>
                <header>
                    <div class="headin prevent-select">
                        <div class="appname">
                            <img src="/img/circletest.png" id="appicon">
                            <p> Chordio </p>
                        </div>
                        <nav>
                            <div class="home-bg" id="home-page-btn">
                                <svg class="home-icon" xmlns="http://www.w3.org/2000/svg" height="1.6em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#4d4d4d}</style><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                            </div>
                            <div class="song-bg" id="song-page-btn">
                                <svg class="song-icon" xmlns="http://www.w3.org/2000/svg" height="1.6em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/></svg>
                            </div>
                        </nav>
                        <div class="user-head">
                            <img src="data:image/png;base64,${user.profile_image.data}" class="user-icon" id="usericon">
                            <div class="user-popup" id="userPopup">
                                <div class="user-profile-popup" id="user-page-btn">
                                    <img src="data:image/png;base64,${user.profile_image.data}" class="my-img" alt="">
                                    <div>
                                        <p class="me">${user.username}</p>
                                        <p class="id">${user._id}</p>
                                    </div>
                                </div>
                                <div class="user-popup-btn userchord">
                                    <svg id="chord-pop-btn" xmlns="http://www.w3.org/2000/svg" class="popup-icon" height="2em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 32a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm-96-32a96 96 0 1 0 192 0 96 96 0 1 0 -192 0zM96 240c0-35 17.5-71.1 45.2-98.8S205 96 240 96c8.8 0 16-7.2 16-16s-7.2-16-16-16c-45.4 0-89.2 22.3-121.5 54.5S64 194.6 64 240c0 8.8 7.2 16 16 16s16-7.2 16-16z"/></svg>
                                    <p>Your chord</p>
                                </div>
                                <div class="user-popup-btn chordsave">
                                    <svg id="like-pop-btn" xmlns="http://www.w3.org/2000/svg" class="popup-icon" height="2em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                                    <p>chord like</p>
                                </div>
                                <div class="user-popup-btn postsave" >
                                    <svg id="save-pop-btn" xmlns="http://www.w3.org/2000/svg" class="popup-icon" height="2em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>
                                    <p>post save</p>
                                </div>
                                <div class="user-popup-btn settingpage">
                                    <svg id="setting-pop-btn" xmlns="http://www.w3.org/2000/svg" class="popup-icon" height="2em" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>
                                    <p>Setting</p>
                                </div>
                                <div class="user-popup-btn logout-show">
                                    <svg id="logout-pop-btn" xmlns="http://www.w3.org/2000/svg" class="popup-icon" height="2em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
                                    <p>Log out</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div class="container">
            <!-- ======================================
            ============== Left Zone ===============
            ======================================  -->
                    <div class="left-container prevent-select">
                        <div class="userprofile">
                            <img src="data:image/png;base64,${user.profile_image.data}" class="other-user-img" alt="">
                            <div class="user-information">
                                <p class="user-name other-me">${user.username}</p>
                                <p class="user-sub other-id">${user._id}</p>
                                <p class="user-sub other-email">${user.email}</p>
                            </div>
                            <div class="user-status">
                                <p class="user-gray">post : </p>
                                <p class="user-text-status">${user.num_posts}</p>
                                <p class="user-gray">chords : </p>
                                <p class="user-text-status">${user.num_chords}</p>
                            </div>
                            <div class="action-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" class="follow-btn" height="2em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>
                                <p class="btn-text">Follow</p>
                            </div>
                        </div>
                    </div>

            <!-- ======================================
            ============== Post Zone ===============
            ======================================  -->

                    <div class="post-container">
                    </div>

            <!-- ======================================
            ============== Right Zone ===============
            ======================================  -->
            <div class="right-container prevent-select">
                <div class="your-chord-side" >
                    <p class="text-your-chord" id="gouserchord"> User Chords</p>
                    <div class="chord-list">
                            
                    </div>
                </div>
            <!-- ======================================
            ======== Pop-Up-Comment/Post  ===========
            ======================================  -->
            <div class="pop-post-container">
            
            </div>

            <div class="logout-fill">
                <div class="logout-container">
                    <div class="logout-bg">
                        <p> 🥺Do you want to Log out?🥺</p>
                        <button type="submit" class="btn-logout">Log out</button>
                    </div>
                </div>
            </div>
            </body>
            </html>
        `;

        res.set('Content-Type', 'text/html');
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


module.exports = router;