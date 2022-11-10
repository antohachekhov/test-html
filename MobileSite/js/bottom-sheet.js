function show_bottom_sheet() {
    let conteiner_panel = document.querySelector(".dark");
    let panel_pet_reg = document.querySelector(".dark .bottom-sheet");
    
    conteiner_panel.classList.add("open");
    
    setTimeout(()=>{
        panel_pet_reg.classList.add("open");
    }, 1);
}

function hide_bottom_sheet() {
    let conteiner_panel = document.querySelector(".dark");
    let panel_pet_reg = document.querySelector(".dark .bottom-sheet");
    
    panel_pet_reg.classList.remove("open");
    
    setTimeout(()=>{
        conteiner_panel.classList.remove("open");
    }, 400); 
}