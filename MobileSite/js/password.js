function show_password(el){
	p = el.parentNode;
    let input = p.querySelector(".reg-form-input");
    let img = el.querySelector("img")
    
	if (input.getAttribute('type') == 'password') {
        img.src = "../resource/eye-close.svg";
		input.setAttribute('type', 'text');
	} else {
        img.src = "../resource/eye-open.svg";
		input.setAttribute('type', 'password');
	}
}

function show_password_login(el){
	p = el.parentNode;
    let input = p.querySelector(".reg-form-input");
    let img = el.querySelector("img")
    
	if (input.getAttribute('type') == 'password') {
        img.src = "../resource/eye-close-brown.svg";
		input.setAttribute('type', 'text');
	} else {
        img.src = "../resource/eye-open-brown.svg";
		input.setAttribute('type', 'password');
	}
}

function show_password_signin(el){
	p = el.parentNode;
    let input = p.querySelector("#password");
    let img = el.querySelector("img")
    
	if (input.getAttribute('type') == 'password') {
        img.src = "./MobileSite/resource/eye-close-brown.svg";
		input.setAttribute('type', 'text');
	} else {
        img.src = "./MobileSite/resource/eye-open-brown.svg";
		input.setAttribute('type', 'password');
	}
}

function check_repeat_password() {
    let password = document.querySelector("#reg-password");
    let repeat_pass = document.querySelector("#repeat-password");
    
    if (repeat_pass.value != 0) {
            if ((password.value != repeat_pass.value) ) {
        password.style = "background-color: #FFB0B0";
        repeat_pass.style = "background-color: #FFB0B0";
        repeat_pass.classList.remove("valid");
        
    }
        else {
            password.style = "background-color: #FFF7EA";
            repeat_pass.style = "background-color: #FFF7EA";
            repeat_pass.classList.add("valid");
    }   
    }
}