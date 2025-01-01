function showHidePassword(inputFieldId, eyeIconId) {
    const inputField = document.getElementById(inputFieldId);
    const eyeIcon = document.getElementById(eyeIconId);

    if (inputField && eyeIcon) {
        if (inputField.type === "password") {
            inputField.type = "text"; // Show password
            eyeIcon.classList.remove('fa-eye'); 
            eyeIcon.classList.add('fa-eye-slash');
        } else {
            inputField.type = "password"; // Hide password
            eyeIcon.classList.remove('fa-eye-slash'); 
            eyeIcon.classList.add('fa-eye'); 
        }
    }
}
