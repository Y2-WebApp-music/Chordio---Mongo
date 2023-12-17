const goProfile = document.getElementById('goProfile');
goProfile.addEventListener('click',() => {
    if (window.location.href !=='./userprofile'){
        window.location.href='./userprofile'
    }
    else {}
});
