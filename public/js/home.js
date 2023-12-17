import { loadPost } from '../js/post/fetchpost.js';

// User Icon Click
const usergobtn = document.getElementById('user-go-btn');
usergobtn.addEventListener('click',() => {
    if (window.location.href !=='/userprofile'){
        window.location.href='/userprofile'
    }
    else {}
});

// User Icon Click
const gotosong = document.getElementById('chord-sus-btn');
gotosong.addEventListener('click',() => {
    if (window.location.href !=='/song'){
        window.location.href='/song'
    }
    else {}
});

// Create Post
const contentInput = document.getElementById("content-input");
contentInput.addEventListener("input", function () {
    const lines = this.value.split("\n");

    this.style.height = "auto"; // Reset the height to auto
    this.style.height = this.scrollHeight + "px"; // Set the height to match the scrollHeight
    // Limit to 5 lines
    if (lines.length > 100) {
        this.value = lines.slice(0, 100).join("\n");
    }
});

// Image Input
const imageInput = document.getElementById("image-input");
const slideshowLeftRight = document.querySelector(".slideshow-left-right");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
prevButton.style.display = "none";
nextButton.style.display = "none";
// Track the current slide index
let currentSlideIndex = 0;

imageInput.addEventListener("change", function (event) {
    const files = event.target.files;
    const images = [];

    // Limit the number of images to 4
    if (files.length > 4) {
        alert("You can only upload up to 4 photos.");
        event.target.value = null; // Clear the file input
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
            images.push({
                src: URL.createObjectURL(file),
                file: file,
            });
        }
    }

    // Show or hide arrow buttons based on the number of images
    if (images.length > 0) {
        prevButton.style.display = "block";
        nextButton.style.display = "block";
    } else {
        prevButton.style.display = "none";
        nextButton.style.display = "none";
    }
    // Clear the existing slideshow
    slideshowLeftRight.innerHTML = "";

    // Create slides for each image
    for (let i = 0; i < images.length; i++) {
        const slide = document.createElement("div");
        slide.className = "slide";
        slide.style.display = i === currentSlideIndex ? "block" : "none";

        const img = document.createElement("img");
        img.src = images[i].src;

        // Create a cancel button for each photo
        const cancelBtn = document.createElement("button");
        cancelBtn.innerHTML = `
        <svg class="cancel-icon" xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>`;
        cancelBtn.className = "cancel-button";
        cancelBtn.addEventListener("click", function () {
            // Remove the photo from the array
            images.splice(i, 1);
            // Remove the slide
            slideshowLeftRight.removeChild(slide);
            // Update the slideshow
            showSlide(currentSlideIndex);
            if (images.length > 0) {
                prevButton.style.display = "block";
                nextButton.style.display = "block";
            } else {
                prevButton.style.display = "none";
                nextButton.style.display = "none";
            }
        });

        slide.appendChild(img);
        slide.appendChild(cancelBtn);
        slideshowLeftRight.appendChild(slide);
    }

    // Function to display the current slide
    function showSlide(index) {
        const slides = document.querySelectorAll(".slide");
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
    }

    // Event listener for the "Previous" button
    prevButton.addEventListener("click", function () {
        currentSlideIndex = (currentSlideIndex - 1 + images.length) % images.length;
        showSlide(currentSlideIndex);
    });

    // Event listener for the "Next" button
    nextButton.addEventListener("click", function () {
        currentSlideIndex = (currentSlideIndex + 1) % images.length;
        showSlide(currentSlideIndex);
    });
});

// Get the select box and current elements
const POPselectBox = document.getElementById("pop-mySelectBox");
const POPcurrentElement = POPselectBox.querySelector(".pop-select-box__current");

POPcurrentElement.addEventListener("focus", () => {
    POPselectBox.style.borderRadius = "20px 20px 0px 0px";
});
POPcurrentElement.addEventListener("blur", () => {
    POPselectBox.style.borderRadius = "20px 20px 20px 20px";
});

// Get the select box and current elements
const POPselectPost = document.getElementById("pop-PostTag");
const POPboxBellow = POPselectPost.querySelector(".pop-select-post_current");

POPboxBellow.addEventListener("focus", () => {
    POPselectPost.style.borderRadius = "20px 20px 0px 0px";
});
POPboxBellow.addEventListener("blur", () => {
    POPselectPost.style.borderRadius = "20px 20px 20px 20px";
});


/* ==================================================
   ================================================== */
// Pop Create Post
const popContentInput = document.getElementById("pop-content-input");
popContentInput.addEventListener("input", function () {
    const lines = this.value.split("\n");

    this.style.height = "auto"; // Reset the height to auto
    this.style.height = this.scrollHeight + "px"; // Set the height to match the scrollHeight
    // Limit to 5 lines
    if (lines.length > 5) {
        this.value = lines.slice(0, 5).join("\n");
    }
});

// Image Input
const popimageInput = document.getElementById("pop-image-input");
const popslideshowLeftRight = document.querySelector(".pop-slideshow-left-right");
const popprevButton = document.querySelector(".pop-prev-button");
const popnextButton = document.querySelector(".pop-next-button");
const poppostButtom = document.querySelector(".pop-post-btn");
popprevButton.style.display = "none";
popnextButton.style.display = "none";
// Track the current slide index
let PopcurrentSlideIndex = 0;

popimageInput.addEventListener("change", function (event) {
    const files = event.target.files;
    const images = [];

    // Limit the number of images to 4
    if (files.length > 4) {
        alert("You can only upload up to 4 photos.");
        event.target.value = null; // Clear the file input
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/")) {
            images.push({
                src: URL.createObjectURL(file),
                file: file,
            });
        }
    }

    // Show or hide arrow buttons based on the number of images
    if (images.length > 0) {
        popprevButton.style.display = "block";
        popnextButton.style.display = "block";
    } else {
        popprevButton.style.display = "none";
        popnextButton.style.display = "none";
    }
    // Clear the existing slideshow
    popslideshowLeftRight.innerHTML = "";

    // Create slides for each image
    for (let i = 0; i < images.length; i++) {
        const slide = document.createElement("div");
        slide.className = "pop-slide";
        slide.style.display = i === PopcurrentSlideIndex ? "block" : "none";

        const img = document.createElement("img");
        img.src = images[i].src;

        // Create a cancel button for each photo
        const cancelBtn = document.createElement("button");
        cancelBtn.innerHTML = `
        <svg class="cancel-icon" xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>`;
        cancelBtn.className = "pop-cancel-button";
        cancelBtn.addEventListener("click", function () {
            // Remove the photo from the array
            images.splice(i, 1);
            // Remove the slide
            popslideshowLeftRight.removeChild(slide);
            // Update the slideshow
            showSlide(PopcurrentSlideIndex);
            if (images.length > 0) {
                popprevButton.style.display = "block";
                popnextButton.style.display = "block";
            } else {
                popprevButton.style.display = "none";
                popnextButton.style.display = "none";
            }
        });

        slide.appendChild(img);
        slide.appendChild(cancelBtn);
        popslideshowLeftRight.appendChild(slide);
    }

    // Function to display the current slide
    function showSlide(index) {
        const slides = document.querySelectorAll(".pop-slide");
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
    }

    // Event listener for the "Previous" button
    popprevButton.addEventListener("click", function () {
        PopcurrentSlideIndex = (PopcurrentSlideIndex - 1 + images.length) % images.length;
        showSlide(PopurrentSlideIndex);
    });

    // Event listener for the "Next" button
    popnextButton.addEventListener("click", function () {
        PopcurrentSlideIndex = (PopcurrentSlideIndex + 1) % images.length;
        showSlide(PopcurrentSlideIndex);
    });

});

var showCRpost = document.querySelector(".createpost-btn");
var postFill = document.querySelector(".create-post-pop");

showCRpost.addEventListener("click", function () {
    postFill.style.display = "flex";
});

postFill.addEventListener("click", function (e) {
    if (e.target === postFill) {
        postFill.style.display = "none";
    }
});
var closePostBtn = document.querySelector(".close-pop-cr-post");
closePostBtn.addEventListener("click", function () {
    postFill.style.display = "none";
});

const form = document.forms["make-post"];
const pform = document.forms["pop-make-post"];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    getValues(form, imageInput);
});
pform.addEventListener("submit", function(event) {
    event.preventDefault();

    getValues(pform, popimageInput);
});

function getValues(f, i) {
    const formData = new FormData();

    if(i.files.length > 0) {
        Array.from(i.files).forEach((file, index) => {
            formData.append("images", file);
        });
    }

    formData.append("cr_post_title", f.cr_post_title.value);
    formData.append("cr_post_detail", f.cr_post_detail.value);
    formData.append("categoryId", f.categoryId.value);
    formData.append("tagId", f.tagId.value);

    handlePostMutation(formData)

    $('.slideshow-left-right').empty();
    $('.pop-slideshow-left-right').empty();
    f.reset();
    contentInput.style.height = "auto";

    $('.post-container').empty();
    loadPost();
    postFill.style.display = "none";
}

function handlePostMutation(formData) {
    fetch("/create-post", {
        method: "post",
        body: formData,
    })
    .then((response) => response.text())
    .then((data) => {})
    .catch((error) => {
        console.error("Error uploading images:", error);
    });
}
