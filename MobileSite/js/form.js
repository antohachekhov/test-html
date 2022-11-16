function change_button() {
    let surname_val = document.querySelector("#reg-lastname").value;
    let name_val = document.querySelector("#reg-firstname").value;
    let nickname_val = document.querySelector("#reg-nickname").value;
    let email = document.querySelector("#reg-mail");
    let email_val = document.querySelector("#reg-mail").value;
    let password_val = document.querySelector("#reg-password").value;
    let repeat_password = document.querySelector("#repeat-password");
    let repeat_password_val = document.querySelector("#repeat-password").value;
    let checkbox_val = document.querySelector("#reg-checkbox").checked;
    let button = document.querySelector("#reg-in");
    
    if (surname_val.length != 0 && name_val.length != 0 && nickname_val.length != 0 && email_val.length != 0 && email.validity.valid == true && password_val.length != 0 && repeat_password_val.length != 0 && checkbox_val == true && repeat_password.classList.contains("valid")) {
        button.disabled = false;
    }
    else {
        button.disabled = true;
    }
}