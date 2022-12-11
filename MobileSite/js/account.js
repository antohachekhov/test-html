//let AccNickname = "SunriseDagger"
//let AccName = "Кутузова Ирина Александровна"
//let AccPhoto = 'http://26.109.231.110:8080/MobileSite/resourse/pet4.jpg'


//заполнение карточки пользователя
export function AccountCardLK(AccNickname, AccName, AccPhoto){
    document.getElementById("login").textContent = AccNickname
    document.getElementById("account-info-name").textContent = AccName
    document.getElementById("lk_image").src = AccPhoto
    if (AccPhoto != null){
        document.getElementById("lk_image").src = `data:image/*;base64,${AccPhoto}`
    }
    else {
        document.getElementById("lk_image").src = "/MobileSite/resource/img.png"
    }
}

//let AdvTitle = "Поговорим о важном"
//let AdvDesc = "Что такое попугай?"
//let AdvImage = 'https://vetspravka.ru/imgs/blog/127/127/blg60acb726d9c9e6-25026911.jpg'

//заполнение карточки совета
export function AdviceCard(AdvImage, AdvTitle, AdvDesc){
    if (AdvTitle != null){
        document.getElementById("advice_title").textContent = AdvTitle
    }
    else {
        document.getElementById("advice_title").textContent = "Совета сегодня не назначено"
    }

    if (AdvTitle != null){
        document.getElementById("advice_desc").textContent = AdvDesc
    }
    else {
        document.getElementById("advice_desc").textContent = "Ожидайте добавления новых советов :)"
    }

    if (AdvImage != null){
        document.getElementById("advice_image").src = `data:image/*;base64,${AdvImage}`
    }
    else {
        document.getElementById("advice_image").src = "/MobileSite/resource/img.png"
    }
}

//let PetPhoto = 'https://vetspravka.ru/imgs/blog/127/127/blg60acb726d9c9e6-25026911.jpg'
//let PetName = "Аркаша"
//заполнение свайп-карточек питомцев пользователя
export function PetsListinLK(PetID, PetPhoto, PetName, user_id){
    let aLink = document.createElement("a")
    let divCardMini = document.createElement("div")
    let imgMini = document.createElement("img")
    let divMiniTitle = document.createElement("div")

    aLink.href = "/MobileSite/html/PetAccount.html?pet_id=" + PetID + "&user_id=" + user_id;
    aLink.className = "card-mini"
    //divCardMini in aLink
    divCardMini.className = "card-mini-img"
    //imgMini in divCalssMini
    if (PetPhoto != null){
        imgMini.src = `data:image/*;base64,${PetPhoto}`
    }
    else {
        imgMini.src = "/MobileSite/resource/img.png"
    }
    //divMiniTitle in divclassMini
    divMiniTitle.className = "card-mini-title"
    divMiniTitle.textContent = PetName

    //compose
    //compose divCardMini
    divCardMini.appendChild(imgMini)
    divCardMini.appendChild(divMiniTitle)
    //compose aLink
    aLink.appendChild(divCardMini)
    //search and add in pets-list-in-lk
    document.getElementById("pets-list-in-lk").appendChild(aLink)
}


//let PetPhoto = 'https://vetspravka.ru/imgs/blog/127/127/blg60acb726d9c9e6-25026911.jpg'
//let PetName = "Аркаша"
//let PetBirth = "12.02.2000"
//let PetBreed = "Какаду"
//let PetWeight = 1
//let PetImage = "мужской"
//let PetAge = 3

//заполнение лк питомца
export function PetAccountLK(PetPhoto, PetName, PetBreed, PetBirth, PetWeight, PetGender, PetAge, PetAct){
    //document.getElementById("pet-profile-photo").src = PetPhoto
    document.getElementById("pet-name").textContent = PetName
    document.getElementById("pet-breed").textContent = PetBreed
    document.getElementById("pet-birth").textContent = PetBirth
    document.getElementById("pet-weight").textContent = PetWeight

    if (PetWeight == null) document.getElementById("pet-attribute-block-weight").hidden = true
    if (PetAge == null) document.getElementById("pet-attribute-block-age").hidden = true
    
    //Фото питомца
    //const imgB64 = PetPhoto;
    if (PetPhoto != null){
        document.getElementById('pet-profile-photo').src = `data:image/*;base64,${PetPhoto}`;
        document.getElementById('photo-img').src = `data:image/*;base64,${PetPhoto}`;
    }
    else {
        document.getElementById('pet-profile-photo').src = "/MobileSite/resource/img.png";
        document.getElementById('photo-img').src = "/MobileSite/resource/img.png";
    }
    

    //Пол питомца
    if (PetGender == 0){
        document.getElementById("pet-gender-img").src = "../resource/man.svg"
        document.getElementById("pet-gender-img").alt = "Мальчик"
        document.getElementById("pet-gender-value").textContent = "мальчик"
    }
    else if (PetGender == 1){
        document.getElementById("pet-gender-img").src = "../resource/woman.svg"
        document.getElementById("pet-gender-img").alt = "Девочка"
        document.getElementById("pet-gender-value").textContent = "девочка"
    }
    else
    {
        document.getElementById("pet-gender-img").src = ""
        document.getElementById("pet-gender-value").textContent = ""
    }
    document.getElementById("pet-age").textContent = PetAge

    //Отображение активности
    switch (PetAct){
        case 1:
            document.getElementById("pet-activity").src = "../resource/speed-indicator-low.svg"
            document.getElementById("pet-act-text").textContent = "Низкая активность"
            break;

        case 2:
            document.getElementById("pet-activity").src = "../resource/speed-indicator-middle.svg"
            document.getElementById("pet-act-text").textContent = "Средняя активность"
            break;

        case 3:
            document.getElementById("pet-activity").src = "../resource/speed-indicator-high.svg"
            document.getElementById("pet-act-text").textContent = "Высокая активность"
            break;

    }

    //редакт питомца
    document.getElementById("edit-name").value = PetName
    document.getElementById("pet_breed").value = PetBreed

    document.getElementById("edit-birth").value = PetBirth
    document.getElementById("edit-weight").value = PetWeight

    document.getElementById("edit-activity1").value = PetAct

    if (PetGender == 0){
        document.getElementById("edit-gender").value = "0"
    }
    else if (PetGender == 1){
        document.getElementById("edit-gender").value = "1"
    }
}

function AccessForUser(nickname, firstname, lastname){
    let divUserBlock = document.createElement("div")
    let divUserName = document.createElement("div")
    let buttonShare = document.createElement("button")
    let imgShare = document.createElement("img")

    divUserBlock.className = "pet-share-user-block"
    divUserName.className = "pet-share-user-name"
    divUserName.textContent = lastname + " " + firstname + " (" + nickname + ")"
    buttonShare.className = "pet-share-user-delete"
    buttonShare.id = "acc"
    buttonShare.value = nickname
    imgShare.src = "../resource/delete-user.svg"

    buttonShare.appendChild(imgShare)
    divUserBlock.appendChild(divUserName)
    divUserBlock.appendChild(buttonShare)
    document.getElementById("list-users-block").appendChild(divUserBlock)
}

export function ListOfAccessForUser(access){
    let count_of_users = access.length;

    for(let i = 0; i < count_of_users; i++){
        AccessForUser(access[i].nickname, access[i].first_name, access[i].last_name)
    }
}