//НЕ ПРОВЕРЕНО
/*let UserId = 1;
let FoodId = 1;
let foodPhoto = "../resource/special-food.svg";
let foodTitle = 'Корм "Петруша"';
let foodNameBrand = "Parrot";
let foodNameAge = "10";
let foodNameBreed = "Какаду";
let foodNameType = "Попугаичьий";
let Steril = "да"; //"нет" "да"*/

export function writeOnHtmlPageFoodsList(PetId, FoodId,foodTitle, foodNameBrand, foodNameAge, foodNameBreed, foodNameType, Steril){
    let divListCard = document.createElement("div")
    let aFood = document.createElement("a")
    let divCard = document.createElement("div")
    let divFlag = document.createElement("div")
    let imgSteril = document.createElement("img")
    let divCardText = document.createElement("div")
    let divCardTitle = document.createElement("div")
    let divDesc = document.createElement("div")
    let divBrandLine = document.createElement("div")
    let spanBrand = document.createElement("span")
    let spanBrandText = document.createElement("span")
    let divAgeLine = document.createElement("div")
    let spanAge = document.createElement("span")
    let spanAgeText = document.createElement("span")
    let divBreedLine = document.createElement("div")
    let spanBreed = document.createElement("span")
    let spanBreedText = document.createElement("span")
    let divTypeLine = document.createElement("div")
    let spanType = document.createElement("span")
    let spanTypeText = document.createElement("span")

    divListCard.className = "list-card"
    //aFood in divListCard
    aFood.href = "./FoodInfo.html?food_id=" + FoodId + "&pet_id=" + PetId; //+id выбранного корма
    aFood.className = "choosing-food"
    //divCard in aFood
    divCard.className = "food-card"
    //divFlag in divCard
    divFlag.className = "food-special-flag" //или будет, или нет
        //imgSteril in divFlag
        imgSteril.src = "/MobileSite/resource/special-food.svg" //иконка стерилизации
    //divCardText in divCard
    divCardText.className = "food-card-text"
    //divCardTitle in divCardText
    divCardTitle.className = "food-card-title" //заголовок корма
    divCardTitle.textContent = foodTitle;
    //divDesc in divCardText
    divDesc.className = "card-description"

    //divBrandLine in divDesc
    divBrandLine.className = "food-card-description-line"
    //spanBrand in divBrandLine
    spanBrand.textContent = "Брэнд:\u00A0"
    //spanBrandText in divBrandLine
    spanBrandText.className = "food-card-brand-name" //название брэнда
    spanBrandText.textContent = foodNameBrand

    //divAgeLine in divDesc
    divAgeLine.className = "food-card-description-line"
    //spanAge in divAgeLine
    spanAge.textContent = "Возраст:\u00A0"
    //spanAgeText in divAgeLine
    spanAgeText.className = "food-card-age" //возраст
    spanAgeText.textContent = foodNameAge

    //divBreedLine in divDesc
    divBreedLine.className = "food-card-description-line"
    //spanBreed in divBreedLine
    spanBreed.textContent = "Порода питомца:\u00A0"
    //spanBreedText in divBreedLine
    spanBreedText.className = "food-card-breed" //название породы
    spanBreedText.textContent = foodNameBreed

    //divTypeLine in divDesc
    divTypeLine.className = "food-card-description-line"
    //spanType in divTypeLine
    spanType.textContent = "Тип корма:\u00A0"
    //spanTypeText in divTypeLine
    spanTypeText.className = "food-card-type" //название брэнда
    spanTypeText.textContent = foodNameType

    //compose 
    //divTypeLine compose
    divTypeLine.appendChild(spanType)
    divTypeLine.appendChild(spanTypeText)
    //divBreedLine compose
    divBreedLine.appendChild(spanBreed)
    divBreedLine.appendChild(spanBreedText)
    //divAgeLine compose
    divAgeLine.appendChild(spanAge)
    divAgeLine.appendChild(spanAgeText)
    //divBrandLine compose
    divBrandLine.appendChild(spanBrand)
    divBrandLine.appendChild(spanBrandText)
    //divDesc compose
    divDesc.appendChild(divBrandLine)
    divDesc.appendChild(divAgeLine)
    divDesc.appendChild(divBreedLine)
    divDesc.appendChild(divTypeLine)
    //divCardText compose
    divCardText.appendChild(divCardTitle)
    divCardText.appendChild(divDesc)
    //divFlag compose
    divFlag.appendChild(imgSteril)
    //divCard compose
    if (Steril == true) divCard.appendChild(divFlag)
    divCard.appendChild(divCardText)
    //aFood compose
    aFood.appendChild(divCard)
    //devListCard compose
    divListCard.appendChild(aFood)
    //search and add in list-of-food
    document.getElementById("list-of-food").appendChild(divListCard)
}

export function showListOfFoods(foods_list, pet_id){

    let count_of_foods = foods_list.length;

    for(let i = 0; i < count_of_foods; i++){
        writeOnHtmlPageFoodsList(pet_id, foods_list[i].food_id, foods_list[i].food_name, foods_list[i].food_brand, foods_list[i].food_pet_age, foods_list[i].food_pet_species_name, foods_list[i].food_type, foods_list[i].food_is_sterilize)
    }
}