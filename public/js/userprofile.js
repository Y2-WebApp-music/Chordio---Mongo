const contentInput = document.getElementById("content-input");
contentInput.addEventListener("input", function () {
    const lines = this.value.split("\n");

    this.style.height = "auto"; // Reset the height to auto
    this.style.height = this.scrollHeight + "px"; // Set the height to match the scrollHeight
    // Limit to 5 lines
    if (lines.length > 5) {
        this.value = lines.slice(0, 5).join("\n");
    }
});

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

const chordcreate = document.getElementById('cr-chord');
chordcreate.addEventListener('click',() => {
    if (window.location.href !=='./chordcreate'){
        window.location.href='./chordcreate'
    }
    else {}
});