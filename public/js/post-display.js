// Check image in post have 3 image
const postImagesContainers = document.querySelectorAll('.post-img');
postImagesContainers.forEach(container => {
    const dataImages = container.querySelectorAll('img[src="data:image/png;base64,null"]');
    const otherImages = container.querySelectorAll('img:not([src="data:image/png;base64,null"])');

    if (dataImages.length === 1 && otherImages.length > 0) {
        otherImages[0].classList.add('post-img-1');
    }
    if (dataImages.length === 3 && otherImages.length > 0) {
        otherImages[0].classList.add('post-img-1');
    }
});

// ================================================================
// ================================================================
// ======= Fix tag and Category of Post =========
// ================================================================
// ================================================================
// Get the select box and current elements
const selectBox = document.getElementById("mySelectBox");
const currentElement = selectBox.querySelector(".select-box__current");

currentElement.addEventListener("focus", () => {
    selectBox.style.borderRadius = "20px 20px 0px 0px";
});
currentElement.addEventListener("blur", () => {
    selectBox.style.borderRadius = "20px 20px 20px 20px";
});

// Get the select box and current elements
const selectPost = document.getElementById("PostTag");
const boxBellow = selectPost.querySelector(".select-post_current");

boxBellow.addEventListener("focus", () => {
    selectPost.style.borderRadius = "20px 20px 0px 0px";
});
boxBellow.addEventListener("blur", () => {
    selectPost.style.borderRadius = "20px 20px 20px 20px";
});

// ================================================================
// ================================================================
// Setting Button of Post In there userProfile page of user
// ================================================================
// ================================================================
// Get all the post elements
const posts = document.querySelectorAll('.post');

// Loop through each post and add event listeners
posts.forEach((post) => {
    const settingBtn = post.querySelector('.setting-btn');
    const setting = post.querySelector('.setting');
    
    settingBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setting.classList.toggle('active');
    });
    
    document.body.addEventListener('click', () => {
        setting.classList.remove('active');
    });
    
    setting.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});