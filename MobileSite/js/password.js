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