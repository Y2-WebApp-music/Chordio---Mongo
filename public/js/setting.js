const goProfile = document.getElementById('goProfile');
goProfile.addEventListener('click',() => {
    if (window.location.href !=='./userprofile'){
        window.location.href='./userprofile'
    }
    else {}
});

// Get references to the title-set elements
const informationButton = document.getElementById("information");
const followedButton = document.getElementById("Followed");
const followerButton = document.getElementById("Follower");

// Get references to the content containers
const userinfoContainer = document.querySelector(".userinfo-container");
const followedContainer = document.querySelector(".Followed-container");
const followerContainer = document.querySelector(".Follower-container");

// Function to set initial styles for informationButton
function setInitialStylesForInformation() {
    // Set styles for informationButton
    informationButton.style.backgroundColor = "var(--color-lightgray)";
    informationButton.querySelector("p").style.color = "var(--color-text)";
    informationButton.querySelector("svg").style.fill = "var(--color-text)";

    // Reset styles for other buttons
    followedButton.style.backgroundColor = "";
    followedButton.querySelector("p").style.color = "var(--color-gray17)";
    followedButton.querySelector("svg").style.fill = "var(--color-gray17)";
    followerButton.style.backgroundColor = "";
    followerButton.querySelector("p").style.color = "var(--color-gray17)";
    followerButton.querySelector("svg").style.fill = "var(--color-gray17)";
}

// Add click event listeners to the title-set elements
informationButton.addEventListener("click", () => {
    // Show the user information content
    userinfoContainer.style.display = "block";
    followedContainer.style.display = "none";
    followerContainer.style.display = "none";

    // Update styles for informationButton
    setInitialStylesForInformation();
});

followedButton.addEventListener("click", () => {
    // Show the followed users content
    userinfoContainer.style.display = "none";
    followedContainer.style.display = "block";
    followerContainer.style.display = "none";

    // Reset styles for informationButton
    informationButton.style.backgroundColor = "";
    informationButton.querySelector("p").style.color = "var(--color-gray17)";
    informationButton.querySelector("svg").style.fill = "var(--color-gray17)";

    // Update styles for followedButton
    followedButton.style.backgroundColor = "var(--color-lightgray)";
    followedButton.querySelector("p").style.color = "var(--color-text)";
    followedButton.querySelector("svg").style.fill = "var(--color-text)";

    // Reset styles for followerButton
    followerButton.style.backgroundColor = "";
    followerButton.querySelector("p").style.color = "var(--color-gray17)";
    followerButton.querySelector("svg").style.fill = "var(--color-gray17)";
});

followerButton.addEventListener("click", () => {
    // Show the followers content
    userinfoContainer.style.display = "none";
    followedContainer.style.display = "none";
    followerContainer.style.display = "block";

    // Reset styles for informationButton
    informationButton.style.backgroundColor = "";
    informationButton.querySelector("p").style.color = "var(--color-gray17)";
    informationButton.querySelector("svg").style.fill = "var(--color-gray17)";

    // Reset styles for followedButton
    followedButton.style.backgroundColor = "";
    followedButton.querySelector("p").style.color = "var(--color-gray17)";
    followedButton.querySelector("svg").style.fill = "var(--color-gray17)";

    // Update styles for followerButton
    followerButton.style.backgroundColor = "var(--color-lightgray)";
    followerButton.querySelector("p").style.color = "var(--color-text)";
    followerButton.querySelector("svg").style.fill = "var(--color-text)";
});

// Set initial styles for informationButton on page load
setInitialStylesForInformation();

const imgProfile = document.getElementById("imgProfile");
const fileInput = document.getElementById("file");

// Add an event listener to the file input to listen for changes
fileInput.addEventListener("change", function() {
    const file = fileInput.files[0];
    if (file) {
        // Create a FileReader to read the selected file
        const reader = new FileReader();
        reader.onload = function(e) {
            // Set the src attribute of the img element to the selected file's data URL
            imgProfile.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


function handleChangePass() {
    const passFill = document.querySelector(".passwd-fill");

    // Display the corresponding comment section
    passFill.style.display = "flex";

    // Add click event listener to close comment sections
    const closechangePassS = document.querySelectorAll(".close-change");

    closechangePassS.forEach(closechangePass => {
        closechangePass.addEventListener("click", function (event) {
            let passFill = document.querySelector(".passwd-fill");

            passFill.style.display = "none";
        });
    });

    // Add click event listener to close comment sections when clicking outside
    const changePassSs = document.querySelectorAll(".passwd-fill");

    changePassSs.forEach(passFill => {
        passFill.addEventListener("click", function (e) {
            if (e.target === passFill) {
                passFill.style.display = "none";
            }
        });
    });
}

const form = document.forms["change-pass"];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    getValues();
});

function getValues() {
    const formData = new FormData();

    formData.append("npassword", form.npassword.value);
    formData.append("password", form.password.value);
    formData.append("cpassword", form.cpassword.value);

    postChangePass(formData);
    form.reset();
}

function postChangePass(formData) {
    fetch("/edit-pass", {
        method: "post",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert(data.message);

            const passFill = document.querySelector(".passwd-fill");
            passFill.style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An unexpected error occurred');
    });
}