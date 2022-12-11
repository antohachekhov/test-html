//let UserId = 1
//let PetName = "Аркаша"
//let PetAge = 3
//let PetBreed = "Какаду"
//let PetPhoto = "https://vetspravka.ru/imgs/blog/127/127/blg60acb726d9c9e6-25026911.jpg"
//let PetId = 12

export function writeOnHtmlPagePetsList(PetId, PetName, PetAge, PetBreed, PetPhoto, user_id){
    let divItem = document.createElement("div")
    let divCard = document.createElement("div")
    let divCardText = document.createElement("div")
    let divPetName = document.createElement("div")
    let divPetDesc = document.createElement("div")
    let divPetAge = document.createElement("div")
    let divPetAgeTitle = document.createElement("div")
    let divPetAgeValue = document.createElement("div")
    let divPetBreed = document.createElement("div")
    let divPetBreedTitle = document.createElement("div")
    let divPetBreedValue = document.createElement("div")

    divItem.className = "list-card"
    //divA in divItem
    let divA = document.createElement("a")
    divA.className = "to-pet-profile"
    divA.href = "/MobileSite/html/PetAccount.html?pet_id=" + PetId + "&user_id=" + user_id;
    //divCard in divA#
    divCard.className = "card"
    let divCardImg = document.createElement("img")
    divCardImg.className = "card-image"
    if(PetPhoto == "" || PetPhoto == null)
     {
     divCardImg.src = "/MobileSite/resource/img.png"
     }
    else {
        divCardImg.src = `data:image/*;base64,${PetPhoto}`
    }

    //divCardText in divCard
    divCardText.className = "pet-card-text"
    //divPetName and divPetDesc in divCardText
    divPetName.className = "pet-card-name" //Ирочка
    divPetName.textContent = PetName
    divPetDesc.className = "pet-card-description"
    //divPetAge and divPetBreed in divPetDesc
    divPetAge.className = "pet-card-age-line one-line"
        //divPetAgeTitle and divPetAgeValue in divPetAge
        divPetAgeTitle.className = "pet-card-desc-title" //Возраст
        divPetAgeTitle.textContent = "Возраст"
        divPetAgeValue.className = "pet-card-desc-value" //22
        divPetAgeValue.textContent = PetAge

    if(PetAge == null) divPetAge.style.visibility = "hidden"
        //--
    divPetBreed.className = "pet-card-breed-line one-line"
        //divPetBreedTitle and divPetBreedValue in divPetBreed
        divPetBreedTitle.className = "pet-card-breed-title pet-card-desc-title" //Порода
        divPetBreedTitle.textContent = "Порода"
        divPetBreedValue.className = "pet-card-breed-value pet-card-desc-value" //Человек-разумный
        divPetBreedValue.textContent = PetBreed
        //--

    // compose 
    //divPetBreed Compose
    divPetBreed.appendChild(divPetBreedTitle)
    divPetBreed.appendChild(divPetBreedValue)
    //divPetBreed Compose
    divPetAge.appendChild(divPetAgeTitle)
    divPetAge.appendChild(divPetAgeValue)
    //divPetDesc Compose
    divPetDesc.appendChild(divPetAge)
    divPetDesc.appendChild(divPetBreed)
    //divCardText Compose
    divCardText.appendChild(divPetName)
    divCardText.appendChild(divPetDesc)
    //divCardImg and divCardText in divCard
    divCard.appendChild(divCardImg)
    divCard.appendChild(divCardText)
    //divCard in divA
    divA.appendChild(divCard)
    //divA in divItem
    divItem.appendChild(divA)
    //search and add in pets_list
    document.getElementById("list_pets").appendChild(divItem)
}

export function showListOfPets(pets_list, user_id)
{
    let count_of_pets = pets_list.length;

    for(let i = 0; i < count_of_pets; i++){
        writeOnHtmlPagePetsList(pets_list[i].pet_id, pets_list[i].pet_name, pets_list[i].pet_age, pets_list[i].breed_name, pets_list[i].photo, user_id);
    }
}

export function addBreeds(breeds){
    let count_of_breeds = breeds.length;

    for(let i = 0; i < count_of_breeds; i++){
        let optItem = document.createElement("option");
        optItem.value = breeds[i].breed_name;
        optItem.textContent = breeds[i].breed_name;
        document.getElementById("pet_breed").appendChild(optItem)
    }
}