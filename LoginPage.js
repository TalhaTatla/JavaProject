function showHidePassword(inputField,eyeIcon){
    let inputPass = document.getElementById(inputField);
    if(eyeIcon.classList.contains('fa-eye')){
        inputPass.type = "text";
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    }
    else if(eyeIcon.classList.contains('fa-eye-slash')){
        inputPass.type = "password"
        eyeIcon.classList.add('fa-eye');
        eyeIcon.classList.remove('fa-eye-slash');
    }
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();


    // Retrieve form data
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    $.ajax({
        url: 'http://localhost:8080/accounts/login',
        type: 'POST',
        data: {
            username: $('#username').val(),
            password: $('#password').val()
        },
        success: function(response) {
            console.log(response)
            sessionStorage.removeItem("userId");
            var sessionUserId = sessionStorage.setItem("userId",response);
            console.log(sessionUserId)
            //toastr.success('Login successfully');
            window.location.href="/ExplorePage.htm"
        },
        error: function(error){
            console.log(error);
        }
    })

    // fetch('http://localhost:8080/accounts/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded', // Proper Content-Type for form data
    //     },
    //     body: new URLSearchParams({
    //         username: username,
    //         password: password,
    //     }),
    // })
    // .then(response => {
    //     if (response.ok) {
    //         console.log(response);
    //         console.log(response.body[0]);
    //         const user = JSON.stringify(response.body.user);
    //         console.log(user);
    //         var sessionUserId = sessionStorage.setItem("userId",response.body);
    //         console.log(sessionUserId + "  " + sessionStorage.getItem("userId"));
    //         //window.location.href="/ExplorePage.htm"
    //         toastr.success('Login successfully');
    //     } else {
    //         //toastr.error('login failed Invalid credentials');
    //         alert("Invalid Credentials");
    //     }
    // })
    // .catch(error => {
    //     console.error('Error submitting form:', error);
    // });
})

