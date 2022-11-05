function show_pet_reg_panel() {
    let conteiner_panel = document.querySelector(".dark");
    let panel_pet_reg = document.querySelector(".dark .pet-reg");
    
    conteiner_panel.classList.add("open");
    
    setTimeout(()=>{
        panel_pet_reg.classList.add("open");
    }, 1);
}

function hide_pet_reg_panel() {
    let conteiner_panel = document.querySelector(".dark");
    let panel_pet_reg = document.querySelector(".dark .pet-reg");
    
    panel_pet_reg.classList.remove("open");
    
    setTimeout(()=>{
        conteiner_panel.classList.remove("open");
    }, 400); 
}