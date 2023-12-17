const loginForm = document.forms["login"];

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("user_email", loginForm.user_email.value);
    formData.append("user_pass", loginForm.user_pass.value);

    loginHandle(formData);
    loginForm.reset();
});

function loginHandle(formData) {
    fetch("/login", {
        method: "post",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            window.location.href = '/home';
        }
    })
    .catch(error => {
        window.location.href = '/home';
    });
}


const regForm = document.forms["register"];

regForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("user_name", regForm.user_name.value);
    formData.append("user_email", regForm.user_email.value);
    formData.append("user_pass", regForm.user_pass.value);

    regHandle(formData);
    regForm.reset();
});

function regHandle(formData) {
    fetch("/register", {
        method: "post",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            window.location.href = '/';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An unexpected error occurred');
    });
}