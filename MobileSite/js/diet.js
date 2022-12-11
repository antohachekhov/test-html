//НЕ ПРОВЕРЕНО
/*let UserId = 1;
let DietId = 1;
let imgAct = "../resource/speed-indicator-low.svg";
let feedTitle = 'Рацион для попугая';
let feedName = "Петруша";
let feedWeightPet = "10";
let feedAct = 1; //"not act" = 0; "low" = 1; "middle" = 2; "high" = 3
let dose1 = 20
let dose2 = 50*/

export function writeOnHtmlPageDietList(DietId, feedTitle, feedName, feedWeightPet, feedAct, dose1, dose2, functionButtonClick){
    let divListCard = document.createElement("div")
    let buttonDiet = document.createElement("button")
    let divDietCard = document.createElement("div")
    let divDietCardText = document.createElement("div")
    let divDietCardTitle = document.createElement("div")
    let divDietCardDesc = document.createElement("div")
    let divFeedLine = document.createElement("div")
    let spanFeed = document.createElement("span")
    let spanFeedText = document.createElement("span")
    let divWeightLine = document.createElement("div")
    let spanWeight = document.createElement("span")
    let spanWeightText = document.createElement("span")
    let divActLine = document.createElement("div")
    let spanAct = document.createElement("span")
    let spanActText = document.createElement("span")
    let imgActivity = document.createElement("img")
    let divDose = document.createElement("div")
    let spanOneDose = document.createElement("span")
    let spanG1 = document.createElement("span")
    let spanSum = document.createElement("span")
    let spanG2 = document.createElement("span")

    divListCard.className = "list-card"
    //buttonDiet in divListCard
    buttonDiet.className = "to-diet-info"
    buttonDiet.href = "#" //не отражается
    buttonDiet.id = "button_" + DietId;
    buttonDiet.onclick = functionButtonClick;
    //buttonDiet.onclick = "show-bottom-sheet-diet()" //не отражается
    //divDietCard in buttonDiet
    divDietCard.className = "card diet-card"
    //divDietCardText in divDietCard
    divDietCardText.className = "diet-card-text"
    //divDietCardTitle in divDietCardText
    divDietCardTitle.className = "diet-card-title" //название рациона
    divDietCardTitle.textContent = feedTitle
    //divDietCardDesc in divDietCardText
    divDietCardDesc.className = "card-description diet-card-description" 
    
    //divFeedLine in divDietCardDesc
    divFeedLine.className = "diet-card-description-line" //блок корма
    //spanFeed in divFeedLine
    spanFeed.textContent = "Корм:\u00A0"
    //spanFeedText in divDietCardDesc
    spanFeedText.className = "food-name"
    spanFeedText.textContent = feedName.substr(0,30) + "..."

    //divWeightLine in divDietCardDesc
    divWeightLine.className = "diet-card-description-line" //блок веса питомца
    //spanWeight in divWeightLine
    spanWeight.textContent = "Вес питомца:\u00A0"
    //spanWeightText in divDietCardDesc
    spanWeightText.className = "pet-weight"
    spanWeightText.textContent = feedWeightPet + "\u00A0кг"

    //divActLine in divDietCardDesc
    divActLine.className = "diet-card-description-line" //блок картинки активности
    //spanAct in divActLine
    spanAct.textContent = "Активность питомца:\u00A0"
    //spanActText in divDietCardDesc
    spanActText.className = "pet-activity"
    //imgActivity in spanActText
    let imgAct;
    switch (feedAct){
        case 0:
            imgAct = "";
            spanAct.textContent = ""
            break;

        case 1:
            imgAct = "/MobileSite/resource/speed-indicator-low.svg";
            break;

        case 2:
            imgAct = "/MobileSite/resource/speed-indicator-middle.svg";
            break;

        case 3:
            imgAct = "/MobileSite/resource/speed-indicator-high.svg";
            break;
    }

    imgActivity.src = imgAct

    //divDose in divDietCard
    divDose.className = "diet-card-dose-area"
    //spanOneDose in divDose
    spanOneDose.className = "diet-card-one-dose"
    spanOneDose.textContent = dose1
    //spanG1 in divDose
    spanG1.textContent = "\u00A0г\u00A0из\u00A0"
    //spanSum in divDose
    spanSum.className = "diet-card-sum"
    spanSum.textContent = dose2
    //spanG2 in divDose
    spanG2.textContent = "\u00A0г"

    //compose
    //divDose compose
    divDose.appendChild(spanOneDose)
    divDose.appendChild(spanG1)
    divDose.appendChild(spanSum)
    divDose.appendChild(spanG2)
    //spanActText compose
    spanActText.appendChild(imgActivity)
    //divActLine compose
    divActLine.appendChild(spanAct)
    divActLine.appendChild(spanActText)
    //divWeightLine compose
    divWeightLine.appendChild(spanWeight)
    divWeightLine.appendChild(spanWeightText)
    //divFeedLine compose
    divFeedLine.appendChild(spanFeed)
    divFeedLine.appendChild(spanFeedText)

    //divDietCardDesc compose
    divDietCardDesc.appendChild(divFeedLine)
    divDietCardDesc.appendChild(divWeightLine)
    divDietCardDesc.appendChild(divActLine)

    //divDietCardText compose
    divDietCardText.appendChild(divDietCardTitle)
    divDietCardText.appendChild(divDietCardDesc)

    //divDietCard compose
    divDietCard.appendChild(divDietCardText)
    divDietCard.appendChild(divDose)

    //buttonDiet compose
    buttonDiet.appendChild(divDietCard)

    //divListCard compose
    divListCard.appendChild(buttonDiet)
    
    //search and add in list-of-diets
    document.getElementById("list-of-diets").appendChild(divListCard)

}

export function showListOfDiets(diets_list, functionButtonClick)
{
    let count_of_diets = diets_list.length;

    for(let i = 0; i < count_of_diets; i++){
        writeOnHtmlPageDietList(diets_list[i].ration_id, diets_list[i].ration_name, diets_list[i].ration_food_name, diets_list[i].ration_pet_weight, diets_list[i].ration_activeness_type, diets_list[i].ration_left_size, diets_list[i].ration_total_size, functionButtonClick)
    }
}

export function showPortions(portionId, portionSize, portionTime, portionFeed, functionButtonClick, functionButtonClick1, functionButtonClick2){
    let trTable = document.createElement("tr")
    let tdTableTime = document.createElement("td")
    let inputTime = document.createElement("input")
    let tdTableValue = document.createElement("td")
    let inputValue = document.createElement("input")
    let tdTableCheck = document.createElement("td")
    let inputCheck = document.createElement("input")
    let tdTableButton = document.createElement("td")
    let divTableButton = document.createElement("div")
    let buttonBlock1 = document.createElement("button")
    let imgEdit = document.createElement("img")
    let buttonBlock2 = document.createElement("button")
    let imgDel = document.createElement("img")

    trTable.className = "table-line"

    tdTableTime.className = "table-value"
    inputTime.type = "time"
    inputTime.value = portionTime
    inputTime.id = "time_" + portionId
    inputTime.className = "table-value-input table-value-time"
    inputTime.style = "border-bottom: none;"
    inputTime.disabled = true

    tdTableValue.className = "table-value"
    inputValue.type = "text"
    inputValue.value = portionSize
    inputValue.id = "value_" + portionId
    inputValue.className = "table-value-input"
    inputValue.style = "border-bottom: none;"
    inputValue.disabled = true

    tdTableCheck.className = "table-check"
    inputCheck.type = "checkbox"
    inputCheck.onclick = functionButtonClick2
    inputCheck.id = "check_" + portionId
    if (portionFeed == true) {
        inputCheck.checked = true
        inputCheck.disabled = true
    }

    tdTableButton.className = "table-buttons"
    divTableButton.className = "table-button-block"
    buttonBlock1.className = "table-edit"
    buttonBlock1.onclick = functionButtonClick
    buttonBlock1.id = "edit_" + portionId
    buttonBlock1.value = portionId
    imgEdit.src = "../resource/edit.svg"
    imgEdit.id = "imgEdit_" + portionId

    buttonBlock2.className = "table-delete"
    buttonBlock2.onclick = functionButtonClick1
    buttonBlock2.id = "delete_" + portionId
    buttonBlock2.value = portionId
    imgDel.src = "../resource/delete-diet.svg"

    //compose
    buttonBlock1.appendChild(imgEdit)
    buttonBlock2.appendChild(imgDel)

    divTableButton.appendChild(buttonBlock1)
    divTableButton.appendChild(buttonBlock2)
    tdTableButton.appendChild(divTableButton)

    tdTableCheck.appendChild(inputCheck)
    tdTableValue.appendChild(inputValue)
    tdTableTime.appendChild(inputTime)

    trTable.appendChild(tdTableTime)
    trTable.appendChild(tdTableValue)
    trTable.appendChild(tdTableCheck)
    trTable.appendChild(tdTableButton)

    document.getElementById("table-portions").appendChild(trTable)
}

export function showListOfPortions(portion, functionButtonClick, functionButtonClick1, functionButtonClick2) {
    let count_of_portions = portion.length;

    for(let i = 0; i < count_of_portions; i++){
        if (document.getElementById("delete_" + portion[i].portion_id) == null) showPortions(portion[i].portion_id, portion[i].portion_size, portion[i].portion_time, portion[i].is_feed, functionButtonClick, functionButtonClick1, functionButtonClick2)
    }
}