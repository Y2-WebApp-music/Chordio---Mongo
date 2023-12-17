
const usericon = document.getElementById('usericon');
const popup = document.getElementById("userPopup");

usericon.addEventListener("click", () => {
    popup.classList.toggle('visible');
});

// Close the popup when clicking outside of it
document.addEventListener("click", (event) => {
    if (popup.classList.contains('visible') && !popup.contains(event.target) && event.target !== usericon) {
        popup.classList.remove('visible');
    }
});

// Close the popup when clicking outside of it
document.addEventListener("click", (event) => {
    if (popup.style.transform === "translate(0, 0)" && !userPopup.contains(event.target) && event.target !== usericon) {
        console.log("test4");
        popup.style.transform = "translate(100%, 0)";
    }
});

// App Icon Click
const appicon = document.getElementById('appicon');
appicon.addEventListener('click',() => {
    window.location.href='/home'
});

// Song Icon Click
const songpage = document.getElementById('song-page-btn');
songpage.addEventListener('click',() => {
    if (window.location.href !=='/song'){
        window.location.href='/song'
    }
    else {}
});

// Home Icon Click
const homepage = document.getElementById('home-page-btn');
homepage.addEventListener('click',() => {
    if (window.location.href !=='/home'){
        window.location.href='/home'
    }
    else {}
});

// User Icon Click
const userpage = document.getElementById('user-page-btn');
userpage.addEventListener('click',() => {
    if (window.location.href !=='/userprofile'){
        window.location.href='/userprofile'
    }
    else {}
});

//=====================================================================
//=====================================================================
//=====================================================================
//=====================================================================
//=====================================================================
// Get all elements with the class "userchord"
const userchord = document.querySelectorAll('.userchord');
// Add a click event listener to each element
userchord.forEach((element) => {
    element.addEventListener('click', () => {
        if (window.location.href !== '/userchord') {
            window.location.href = '/userchord';
        }
    });
});

// Get all elements with the class "chordsave"
const chordSaveElements = document.querySelectorAll('.chordsave');
// Add a click event listener to each element
chordSaveElements.forEach((element) => {
    element.addEventListener('click', () => {
        if (window.location.href !== '/chordlike') {
            window.location.href = '/chordlike';
        }
    });
});

// Get all elements with the class "userchord"
const postsave = document.querySelectorAll('.postsave');
// Add a click event listener to each element
postsave.forEach((element) => {
    element.addEventListener('click', () => {
        if (window.location.href !== '/postsave') {
            window.location.href = '/postsave';
        }
    });
});

// Get all elements with the class "userchord"
const settingpage = document.querySelectorAll('.settingpage');
// Add a click event listener to each element
settingpage.forEach((element) => {
    element.addEventListener('click', () => {
        if (window.location.href !== '/setting') {
            window.location.href = '/setting';
        }
    });
});

// Get all elements with the class "userchord"
const logout = document.querySelectorAll('.btn-logout');
// Add a click event listener to each element
logout.forEach((element) => {
    element.addEventListener('click', () => {
        if (window.location.href !== '/logout') {
            window.location.href = '/logout';
        }
    });
});

// ================================================================
// =================== Log Pop-Up ======================
// ================================================================
// ================================================================
document.addEventListener("DOMContentLoaded", function () {
    // Add click event listener to all comment buttons
    const logButtons = document.querySelectorAll(".logout-show");

    logButtons.forEach(logButton => {
        logButton.addEventListener("click", function (event) {
            const logoutFill = document.querySelector(".logout-fill");
            popup.classList.remove('visible');
            // Display the corresponding comment section
            logoutFill.style.display = "flex";
        });
    });

    // Add click event listener to close comment sections when clicking outside
    const logclFills = document.querySelectorAll(".logout-fill");

    logclFills.forEach(logclFill => {
        logclFill.addEventListener("click", function (e) {
            if (e.target === logclFill) {
                logclFill.style.display = "none";
            }
        });
    });
});
