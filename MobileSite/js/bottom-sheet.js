function show_bottom_sheet_pet_form() {
    let conteiner_panel = document.querySelector(".dark");
    let panel_pet_reg = document.querySelector(".dark .pet-reg");
    
    conteiner_panel.classList.add("open");
    
    setTimeout(()=>{
        panel_pet_reg.classList.add("open");
    }, 1);
}

function hide_bottom_sheet_pet_form() {
    let conteiner_panel = document.querySelector(".dark");
    let panel_pet_reg = document.querySelector(".dark .pet-reg");
    
    panel_pet_reg.classList.remove("open");
    
    setTimeout(()=>{
        conteiner_panel.classList.remove("open");
    }, 400); 
}

function show_bottom_sheet_share() {
    let conteiner_panel = document.querySelector(".dark");
    let panel_pet_reg = document.querySelector(".dark .pet-share");
    
    conteiner_panel.classList.add("open");
    
    setTimeout(()=>{
        panel_pet_reg.classList.add("open");
    }, 1);
}

function hide_bottom_sheet_share() {
    let conteiner_panel = document.querySelector(".dark");
    let panel_pet_reg = document.querySelector(".dark .pet-share");
    
    panel_pet_reg.classList.remove("open");
    
    setTimeout(()=>{
        conteiner_panel.classList.remove("open");
    }, 400); 
}

function show_delete_pet() {
    let conteiner_panel = document.querySelector(".dark");
    let panel = document.querySelector(".dark .delete-pet-panel");
    
    conteiner_panel.classList.add("open");
    
    setTimeout(()=>{
        panel.classList.add("open");
    }, 1);
}

function hide_delete_pet() {
    let conteiner_panel = document.querySelector(".dark");
    let panel = document.querySelector(".dark .delete-pet-panel");
    
    panel.classList.remove("open");
    
    setTimeout(()=>{
        conteiner_panel.classList.remove("open");
    }, 400); 
}

function show_bottom_sheet_diet() {
    let conteiner_panel = document.querySelector(".dark");
    let panel_pet_reg = document.querySelector(".dark .diet-info");
    
    conteiner_panel.classList.add("open");
    
    setTimeout(()=>{
        panel_pet_reg.classList.add("open");
    }, 1);
}

function hide_bottom_sheet_diet() {
    let conteiner_panel = document.querySelector(".dark");
    let panel_pet_reg = document.querySelector(".dark .diet-info");
    
    panel_pet_reg.classList.remove("open");
    
    setTimeout(()=>{
        conteiner_panel.classList.remove("open");
    }, 400); 
}

function show_change_keyword() {
    let conteiner_panel = document.querySelector(".dark");
    let panel_pet_reg = document.querySelector(".dark .change-key-panel");
    
    conteiner_panel.classList.add("open");
    
    setTimeout(()=>{
        panel_pet_reg.classList.add("open");
    }, 1);
}

function hide_change_keyword() {
    let conteiner_panel = document.querySelector(".dark");
    let panel_pet_reg = document.querySelector(".dark .change-key-panel");
    
    panel_pet_reg.classList.remove("open");
    
    setTimeout(()=>{
        conteiner_panel.classList.remove("open");
    }, 400); 
}