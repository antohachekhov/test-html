function active_inputs(el) {
    let isActive = el.dataset.isActive;
    
    p = el.parentNode.parentNode.parentNode
    let inputs = p.getElementsByClassName("table-value-input");
    
    let img = el.querySelector("img");    
    if (isActive == "false"){
        img.src = "../resource/table-save.svg";
        el.dataset.isActive = true;
    
        for (let input of inputs){
            input.disabled = false;
            input.style = "border-bottom: 2px solid #43210D";
        }
        
    }
    else{
        img.src = "../resource/edit.svg";
        el.dataset.isActive = false;
        for (let input of inputs){
            input.disabled = true;
            input.style = "border-bottom: none";
        }
    }
}