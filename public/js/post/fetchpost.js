import { RegularPost } from './regularPost.js';

import { getCurrentUser } from '../user-display/user-display.js';

import { fetchcomments } from '../comment/fetchcomment.js';

let id;

export function fetchPosts(user, tag, cate, search) {
    let save = false;
    if (homeValue === null) {
        id = user.user_id
    } else if (homeValue === 'save') {
        id = 'all';
        save = true;
    } else if (homeValue) {
        id = homeValue
            ? homeValue
            : 'all';
    }

    $.ajax({
        url: `/fetchpost/${id}`,
        method: 'GET',
        success: function (data) {
            displayPosts(data, save, tag, cate, search);
        },
        error: function (error) {
            console.error('Error fetching posts:', error);
        }
    });
}

function checksearch(post, search, filter) {
    if (search) {
        let s = false;
        for (const key of ['title', 'content', 'username', 'category', 'tag']) {
            if (typeof post[key] === 'string' && post[key].toLowerCase().includes(search.toLowerCase())) {
                s = true;
            }
        }

        filter = filter && s;
    }

    return filter;
}


// Function to display posts in the HTML
function displayPosts(posts, save, tag, cate, search) {
    const regularPost = posts.map(post => {

        if (tag && cate) {
            let filter = post.tag.toLowerCase() === tag &&
                post.category.toLowerCase() === cate;

            const filterPost = checksearch(post, search, filter)
            ? new RegularPost(
                post.post_id,
                post.title,
                post.content,
                post.img1,
                post.img2,
                post.img3,
                post.img4,
                post.postdate,
                post.likes,
                post.user_id,
                post.username,
                post.profile_image,
                post.category,
                post.tag,
                post.isLike,
                post.isSave
            )
            : null;

            return filterPost;

        } else if (tag) {
            let filter = post.tag.toLowerCase() === tag;

            const filterPost = checksearch(post, search, filter)
            ? new RegularPost(
                post.post_id,
                post.title,
                post.content,
                post.img1,
                post.img2,
                post.img3,
                post.img4,
                post.postdate,
                post.likes,
                post.user_id,
                post.username,
                post.profile_image,
                post.category,
                post.tag,
                post.isLike,
                post.isSave
            )
            : null;

            return filterPost;

        } else if (cate) {
            let filter = post.category.toLowerCase() === cate;

            const filterPost = checksearch(post, search, filter)
            ? new RegularPost(
                post.post_id,
                post.title,
                post.content,
                post.img1,
                post.img2,
                post.img3,
                post.img4,
                post.postdate,
                post.likes,
                post.user_id,
                post.username,
                post.profile_image,
                post.category,
                post.tag,
                post.isLike,
                post.isSave
            )
            : null;

            return filterPost;

        }
        
        if(save) {
            let filter = true;

            const savePost = post.isSave && checksearch(post, search, filter)
            ? new RegularPost(
                post.post_id,
                post.title,
                post.content,
                post.img1,
                post.img2,
                post.img3,
                post.img4,
                post.postdate,
                post.likes,
                post.user_id,
                post.username,
                post.profile_image,
                post.category,
                post.tag,
                post.isLike,
                post.isSave
            )
            : null;

            return savePost;

        } else {
            let filter = true;

            const Post = checksearch(post, search, filter)
            ? new RegularPost(
                post.post_id,
                post.title,
                post.content,
                post.img1,
                post.img2,
                post.img3,
                post.img4,
                post.postdate,
                post.likes,
                post.user_id,
                post.username,
                post.profile_image,
                post.category,
                post.tag,
                post.isLike,
                post.isSave
            )
            : null;

            return Post;
        }
    });

    regularPost.forEach(post => {
        if(post) {
            post.fetchPost();
        }
    });


    const postend = $('<div>').addClass('end-of-post');
    postend.html(`<p>Create by : Guy and Guy</p>`)
    $('.post-container').append(postend);

    fetchcomments();
}


// Call the fetchPosts function to load posts when the page loads
$(document).ready(loadPost());

export function loadPost() {
    getCurrentUser()
    .then(function(user) {
        fetchPosts(user);
    })
    .catch(function(error) {
        console.error(error);
    });
}