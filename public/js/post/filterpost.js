import { getCurrentUser } from "../user-display/user-display.js";
import { fetchPosts } from "./fetchpost.js";

var tag;
var cate;

const art_btn = document.querySelector('.article');
const ques_btn = document.querySelector('.question');

if (art_btn) {
    art_btn.addEventListener('click', () => {
        art_btn.classList.toggle('active');
    
        if(ques_btn.classList[2]) {
            ques_btn.classList.toggle('active');
        }
    
        filter(art_btn);
    });

    ques_btn.addEventListener('click', () => {
        ques_btn.classList.toggle('active');
    
        if(art_btn.classList[2]) {
            art_btn.classList.toggle('active');
        }
    
        filter(ques_btn);
    });
    
    const catebtn = document.querySelectorAll('.Tag-btn');
    catebtn.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
    
            catebtn.forEach(othbtn => {
                if (othbtn.classList[1] != btn.classList[1]) {
                    othbtn.classList.remove('active');
                }
            });
    
            filter(btn);
        })
    });
}

function filter(btn) {

    if (btn.classList[0] === 'category-btn' && btn.classList[2]) {
        tag = btn.classList[1];
    } else if (btn.classList[0] === 'category-btn') {
        tag = undefined;
    }

    if (btn.classList[0] === 'Tag-btn' && btn.classList[2]) {
        cate = btn.classList[1];
        if (btn.classList[1] === 'se') {
            cate = 'sound engineer';
        }
    } else if (btn.classList[0] === 'Tag-btn') {
        cate = undefined;
    }

    refetch();
}

function refetch() {
    const posts = document.querySelectorAll('.post');
    const endp = document.querySelector('.end-of-post');

    posts.forEach(post => {
       post.remove();
    });
    endp.remove();

    getCurrentUser()
    .then(function(user) {
        fetchPosts(user, tag, cate, search);
    })
    .catch(function(error) {
        console.error(error);
    });
}


// search

const searchVal = document.querySelector('.input-field');
var search;

searchVal.addEventListener('change', (e) => {
    search = e.currentTarget.value;

    refetch();
});