import { registeringServiceWorker } from '/app.js';
// Запускаю service worker
registeringServiceWorker();

import { createRequest } from './klient.js';
import { showListOfPets, addBreeds } from './list_pets.js';
import { showListOfDiets } from './diet.js';
import { showListOfFoods } from './choose_food.js';
import { showListOfAdvices } from './list_advices.js'

let url = new URL(document.URL) //'/MobileSite/html/PetAccount.html'
let urlOrigin = url.origin;

function sendRequest(url, object)
{
    return new Promise( function(resolve, reject) {
        let answer = createRequest(url, object);
        answer = JSON.parse(answer);

        if(answer.status == 200)  resolve(answer.object);
        else {
            let error;
            if (answer.status >= 600) error = answer.status + " " + answer.message;
            else error = "Необработанная ошибка";
            reject(new Error(error));
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    
    let urlPath = url.pathname;
    let user = new Object();
    let pet = new Object();
    let food = new Object();

    switch (urlPath){
        case "/MobileSite/html/PetAccount.html":
            pet = {
                pet_id: url.searchParams.get("pet_id")
            };

            let pet1 = {
                pet_id: url.searchParams.get("pet_id")
            };

            sendRequest("/breeds_list", null)
                // Сюда пишешь функции, если все хорошо
                .then((value) =>  addBreeds(value.breeds))
                // Сюда если ошибка
                .catch((error) => console.log(error))

            let pet_promise1 = sendRequest("/pet", pet)
            let users_promise = sendRequest("/pet/access_user/list", pet1)

            // Ждет выполнения запросов указанных в массиве-аргументе Promise.all()
            Promise.all([pet_promise1, users_promise])
                .then((data) => PetLK(data[0], data[1]))
                .catch((error) => console.log(error));

            document.getElementById("photo-img").onclick = changePhoto;

            document.getElementById("diet-for-pet").href = "./Diet.html?pet_id=" + pet.pet_id;
            //document.getElementById("petacc-a").href = "./PetsList.html?user_id=" + user.user_id;
            document.getElementById("edit-save").onclick = saveEditPet;
            document.getElementById("delete-yes").onclick = deletePet;
            
            //настройки общего доступа
            document.getElementById("button-add-user-for-pet").onclick = UserForPet;
            document.getElementById("button-del-user-for-pet").onclick = deleteAccess;
            break;

        case "/MobileSite/html/PetsList.html":
            user = {
                user_id: url.searchParams.get("user_id")
            };


            sendRequest("/breeds_list", null)
                // Сюда пишешь функции, если все хорошо
                .then((value) =>  addBreeds(value.breeds))
                // Сюда если ошибка
                .catch((error) => console.log(error))


            sendRequest("/pets_list", user)
                // Сюда пишешь функции, если все хорошо
                .then((value) =>  showListOfPets(value, user.user_id))
                // Сюда если ошибка
                .catch((error) => console.log(error))

            //document.getElementById("pets_list_plus").onclick = breedsPet;
            //document.getElementById("petslist-a").href = "./Account.html?user_id=" + user.user_id;
            let blah = document.getElementById("photo_img");
            document.getElementById("pet_photo").onchange = (evt) => {
                const file = document.getElementById("pet_photo").files[0]
                if (file != undefined || file != null) {
                blah.src = URL.createObjectURL(file)
                }
            }

            document.getElementById("reg").onclick = registeringPet;
            break;

        case "/MobileSite/html/Account.html":
            user = {
                user_id: url.searchParams.get("user_id")
            };

            let user_promise = sendRequest("/user", user)
            let advice_promise = sendRequest("/day_advice", null)
            let pet_list_promise = sendRequest("/pets_list", user)

            Promise.all([user_promise, advice_promise, pet_list_promise])
                .then((data) => ShowUserLK(data[0], data[1], data[2], user.user_id))
                .catch((error) => console.log(error));

            sendRequest("/breeds_list", null)
                .then((value) =>  addBreeds(value.breeds))
                .catch((error) => console.log(error))

            let blah1 = document.getElementById("photo_img");
            document.getElementById("pet_photo").onchange = (evt) => {
                const file = document.getElementById("pet_photo").files[0]
                if (file != undefined || file != null) {
                blah1.src = URL.createObjectURL(file)
                }
            }

            document.getElementById("show-all-pets").href = "./PetsList.html?user_id=" + user.user_id;
            //document.getElementById("pets_list_plus1").onclick = breedsPet;
            document.getElementById("reg1").onclick = registeringPet;
            document.getElementById("button-exit").onclick = exitExit;
            document.getElementById("acc-settings").href = "./Settings.html?user_id=" + url.searchParams.get("user_id")
            //document.getElementById("acc-settings").onclick = settings;
            break;

        case "/MobileSite/html/LogIn.html":
            document.getElementById("reg-in").onclick = registeringUser;
            break;

        case "/MobileSite/html/Advices.html":
            sendRequest("/advice/list", null)
                // Сюда пишешь функции, если все хорошо
                .then((value) =>  showListOfAdvices(value))
                // Сюда если ошибка
                .catch((error) => console.log(error))
            break;
        
        case "/MobileSite/html/Diet.html":
            pet = {
                pet_id: url.searchParams.get("pet_id")
            };

            sendRequest("/pet/ration/list", pet)
                .then((value) => { showListOfDiets(value, (event) => {

                let button = event.currentTarget;
                let id = button.id.split('_')[1];
                
                let ration = {
                    ration_id: id
                };

                //document.getElementById("diet-info-header").id = "diet-info-header_" + id;
                document.getElementById("hide").value = id;

                // Send get query
                let ration_promise = sendRequest("/pet/ration", ration)
                let portion_promise = sendRequest("/pet/ration/portion/list", ration)
                let food_promise = sendRequest("/pet/ration/food", ration)

                // Ждет выполнения запросов указанных в массиве-аргументе Promise.all()
                Promise.all([ration_promise, portion_promise, food_promise])
                    .then((data) => ShowDiet(data[0], data[1], data[2]))
                    .catch((error) => console.log(error));

                // Show panel
                let conteiner_panel = document.querySelector(".dark");
                let panel_pet_reg = document.querySelector(".dark .diet-info");

                conteiner_panel.classList.add("open");

                setTimeout(()=>{ panel_pet_reg.classList.add("open");}, 1);

                }
                )})
                .catch((error) => console.log(error))
            
            document.getElementById("diet-plus").href = './ChooseFood.html?pet_id=' + pet.pet_id;
            document.getElementById("add-portion").onclick = NewPortion;
            //document.getElementById("delete").onclick = DeletePortion;
            break;    

        case "/MobileSite/html/ChooseFood.html":
            pet = {
                pet_id: url.searchParams.get("pet_id")
            };

            sendRequest("/food_list", null)
                .then((value) => showListOfFoods(value, pet.pet_id))
                .catch((error) => console.log(error))
            break; 

        case "/MobileSite/html/FoodInfo.html":
            food = {
                food_id : url.searchParams.get("food_id")
            }    

            pet = {
                pet_id: url.searchParams.get("pet_id")
            };

            let food_promise = sendRequest("/food", food)
            let pet_promise = sendRequest("/pet", pet)

            // Ждет выполнения запросов указанных в массиве-аргументе Promise.all()
            Promise.all([food_promise, pet_promise])
                .then((data) => AboutFood(data[0], data[1]))
                .catch((error) => console.log(error));
            
            document.getElementById("active-checkbox").onchange = CheckFood;
            document.getElementById("food-info-count").onclick = function(){

                let input = {
                    input_id : food.food_id,
                    input_name : document.getElementById("food-info-input-name").value,
                    input_weight : document.getElementById("food-info-input-weight").value,
                    input_active : document.getElementById("food-info-input-active").value
                }
                
                sendRequest("/pet/ration/calculate", input)
                    .then((value) => document.getElementById("food-info-input-dose").value = value.ration_total_size)
                    .catch((error) => console.log(error))

                if (document.getElementById("food-info-title2").value == null) alert("Введите название рациона!")
            }

            document.getElementById("food-info-save").onclick = function(){
                //отправка данных на добавление
                let active;
                if (document.getElementById("food-info-input-active").hidden == true) {
                    active = 0
                }
                else {
                    active = document.getElementById("food-info-input-active").value
                
                }
                
                food = {
                    food_id : url.searchParams.get("food_id")
                }  

                pet = {
                    pet_id: url.searchParams.get("pet_id")
                };
                
                let input = {
                    input_id : food.food_id,
                    input_pet_id : pet.pet_id,
                    input_name : document.getElementById("food-info-input-name").value,
                    input_weight : document.getElementById("food-info-input-weight").value,
                    input_active : active,
                    input_calc : document.getElementById("food-info-input-dose").value,
                    input_auto : document.getElementById("active-checkbox").checked
                }

                let answer = createRequest("/pet/ration/add", input);
                answer = JSON.parse(answer); 

                if (answer.status == 200)
                {
                    alert("Добавление успешно :)");

                    let newUrlHref = url.origin + "/MobileSite/html/Diet.html?pet_id=" + pet.pet_id
                    let newUrl = new URL(newUrlHref)
                    window.location.href = newUrl;
                }
                else
                {
                    alert("Что-то пошло не так :(");
                }
            }
            document.getElementById("diet-info-del").onclick = DeleteRation;
            break; 

        case "/MobileSite/html/Settings.html":
            //document.getElementById("settings-pd").onclick = settingsPD;  
            document.getElementById("settings-pd").href = "./PersonalData.html?user_id=" + url.searchParams.get("user_id")     
            break;

        case "/MobileSite/html/PersonalData.html":
            user = {
                user_id : url.searchParams.get("user_id")
            }    
        
            sendRequest("/user", user)
                .then((value) =>  manData(value))
                .catch((error) => console.log(error))
            
            document.getElementById("save-change").onclick = changeManData;            
            break;
    }
});

//вход пользователя в систему
document.getElementById("log-in").onclick = function(){
    let login =
    {
        mail : document.getElementById("mail").value,
        password : document.getElementById("password").value
    }

    let answer = createRequest("/autho", login) // Отправка Саше логина и пароля
    answer = JSON.parse(answer)


    //если все верно, то придет user_id, если нет, то должно прийти, что неверный логин или пароль
    //есть ли питомцы
    if (answer.status == 200)
    {
        alert("Вход успешен :)");
        let userId = answer.object;

        let newUrlHref = url.origin + "/MobileSite/html/Account.html?user_id=" + userId.user_id
        let newUrl = new URL(newUrlHref)
        window.location.href = newUrl;
    }
    else
    {
        alert("Неверный логин или пароль :(");
    }

        //if_pet_exist приходит bool плюс приходит совет
        //("/user") //а тут у нас переход в лк;

}

/*function a(){
    show_bottom_sheet_diet();
}*/
//регистрация нового пользователя
function registeringUser(){
    let registr =
    {
        last_name : document.getElementById("reg-lastname").value,
        first_name : document.getElementById("reg-firstname").value,
        patronymic : document.getElementById("reg-patronymic").value,
        nickname : document.getElementById("reg-nickname").value,
        mail : document.getElementById("reg-mail").value,
        phone : document.getElementById("reg-phone").value,
        password : document.getElementById("reg-password").value
        //reg-checkbox
    }

    let answer = createRequest("/registr", registr) // Отправка Саше логина и пароля
    answer = JSON.parse(answer);

    //если все верно, то придет user_id, если нет, то должно прийти, что неверный логин или пароль
    if (answer.status == 200)
    {
        alert("Регистрация прошла успешно :)");
        window.location.href = "/index.html";
    }
    else
    {
        alert("Что-то пошло не так :(");
    }
}

//регистрация нового питомца
function registeringPet(){
    
    if (document.getElementById("edit-activity").value == null) document.getElementById("edit-activity").value = 2;
    
    let pet =
    {
        user_id : url.searchParams.get("user_id"),
        name: document.getElementById("pet_name").value,
        date_of_birth: document.getElementById("pet_date_of_birth").value,
        breed_id: document.getElementById("pet_breed").selectedIndex,
        gender: document.getElementById("pet_gender").value,
        weight: document.getElementById("pet_weight").value,
        active : document.getElementById("edit-activity").value,
        photo: document.getElementById("pet_photo").files[0],
        documents: "",
        id:""
    }

    let newPet = createRequest("/add_pet", pet) // Здесь Саша вернет id и возраст потом как нибудь
    newPet = JSON.parse(newPet);

    //если все верно, то придет user_id, если нет, то должно прийти, что неверный логин или пароль
    if (newPet.status == 200)
    {
        alert("Добавление прошло успешно :)");
        //alert(newPet.object.pet_id);
        window.location.replace("/MobileSite/html/PetAccount.html?pet_id="+ newPet.object.pet_id + "&user_id=" + pet.user_id);
    }
    else
    {
        alert("Что-то пошло не так :(");
    }
}

function changePhoto(){
    let blah2 = document.getElementById("photo-img");
        document.getElementById("pet_photo1").onchange = (evt) => {
            const file = document.getElementById("pet_photo1").files[0]
            if (file != undefined || file != null) {
                blah2.src = URL.createObjectURL(file)
            }
    }
}

function saveEditPet(){
    let pet_id = url.searchParams.get("pet_id");

    let blah2 = document.getElementById("photo-img");
        /*document.getElementById("pet_photo1").onchange = (evt) => {*/
            const file = document.getElementById("pet_photo1").files[0]
            if (file != undefined || file != null) {
                blah2.src = URL.createObjectURL(file)
            }
            else{
                //file = 
            }

    let pet =
    {
        pet_id : pet_id,
        name: document.getElementById("edit-name").value,
        date_of_birth: document.getElementById("edit-birth").value,
        breed_id: document.getElementById("pet_breed").selectedIndex + 1,
        gender: document.getElementById("edit-gender").value,
        weight: document.getElementById("edit-weight").value,
        active : document.getElementById("edit-activity1").value,
        photo: file,
        documents: ""
    }

    let newPet = createRequest("/pet/change", pet)
    newPet = JSON.parse(newPet);

    if (newPet.status == 200)
    {
        alert("Обновление данных прошло успешно :)");
        window.location.href = "/MobileSite/html/PetAccount.html?pet_id="+ pet_id + "&user_id=" + url.searchParams.get("user_id");
    }
    else
    {
        alert("Что-то пошло не так :(");
    }
}

function deletePet(){
    
    let user = {
        user_id : url.searchParams.get("user_id")
    };

    let us = createRequest("/user", user)
    us = JSON.parse(us)

    let send = {
        pet_id: url.searchParams.get("pet_id"),
        nickname: us.object.nickname
    };

    let answer = createRequest("/pet/access_user/delete", send)
    answer = JSON.parse(answer)
    if (answer.status == 200)
    {
        alert("Питомец был успешно удален!");
        window.location.href = "/MobileSite/html/Account.html?user_id=" + url.searchParams.get("user_id");
    }
    else
    {
        alert("Что-то пошло не так :(");
    }
}

function deleteAccess(){
    /*let button = event.currentTarget;
    let value = button.value;*/
    let user_id = url.searchParams.get("user_id")

    let send = {
        pet_id: url.searchParams.get("pet_id"),
        nickname: document.getElementById("del-user-for-pet").value
    };

    let answer = createRequest("/pet/access_user/delete", send)
    answer = JSON.parse(answer)
    if (answer.status == 200)
    {
        alert("Доступ был успешно убран!");
        window.location.href = "/MobileSite/html/PetAccount.html?pet_id=" + send.pet_id + "&user_id=" + user_id;
    }
    else
    {
        alert("Что-то пошло не так :(");
    }
}

function UserForPet(){
    
    let user_id = url.searchParams.get("user_id")
    let user = {
        pet_id : url.searchParams.get("pet_id"),
        nickname : document.getElementById("add-user-for-pet").value
    };

    let newPet = createRequest("/pet/access_user/add", user)
    newPet = JSON.parse(newPet);

    if (newPet.status == 200)
    {
        alert("Передача доступа прошла успешно :)");
        window.location.replace("/MobileSite/html/PetAccount.html?pet_id="+ user.pet_id + "&user_id=" + user_id);
    }
    else
    {
        alert("Что-то пошло не так :(");
    }

}

import { AccountCardLK } from './account.js';
import { AdviceCard } from './account.js';
import { PetAccountLK } from './account.js';
import { PetsListinLK } from './account.js';
import { ListOfAccessForUser } from './account.js';
import { showListOfPortions } from './diet.js';

//блок заполнения лк пользователя
function ShowUserLK(user, advice, pets_list, user_id) {

    let userName = user.last_name + " " + user.first_name
    if (user.patronymic != null) userName = userName + " " + user.patronymic;
    

    AccountCardLK(user.nickname, userName, user.photo);
    AdviceCard(advice.advice_photo, advice.advice_name, advice.advice_description)
    if(pets_list != undefined){
        let count_of_pets = pets_list.length;

        for(let i = 0; i < count_of_pets; i++){
            PetsListinLK(pets_list[i].pet_id, pets_list[i].photo, pets_list[i].pet_name, user_id);
        }
    }

}

//открыть страницу списка питомцев
document.getElementById("show-all-pets").onclick = function(){
    window.location.href = "/MobileSite/html/PetsList.html";
}

//блок заполнения лк питомца
function PetLK(pet, access) {    
    PetAccountLK(pet.photos, pet.pet_name, pet.breed_name, pet.pet_date_of_birth, pet.pet_weight, pet.pet_gender, pet.pet_age, pet.pet_activeness_type);
    ListOfAccessForUser(access)

    pet = {
        pet_id: url.searchParams.get("pet_id")
    }; 

    let answer = createRequest("/pet/main_user", pet) // Отправка Саше логина и пароля
    answer = JSON.parse(answer)
    answer = answer.object;

    document.getElementById("main-user").textContent = answer.last_name + " " + answer.first_name + " (" + answer.nickname + ")"
}

//блок заполнения информации о еде
function AboutFood(food, pet){
    
    document.getElementById("food-info-title").textContent = "Название корма"
    document.getElementById("food-info-title2").textContent = "Название корма:\u00A0" + food.food_name;
    document.getElementById("food-info-brand").textContent = "Брэнд корма:\u00A0" + food.food_brand;
    document.getElementById("food-info-type").textContent = "Тип корма:\u00A0" + food.food_type;
    document.getElementById("food-info-breed").textContent = "Вид питомца:\u00A0" + food.food_pet_species_name;
    if (food.food_is_sterilize == true) document.getElementById("food-info-steril").textContent = "Стерилизованный";
    
    document.getElementById("food-info-input-weight").value = pet.pet_weight
    document.getElementById("food-info-input-active").value = pet.pet_activeness_type
    document.getElementById("active-checkbox").checked = true
    document.getElementById("food-info-input-weight").disabled = true
    document.getElementById("food-info-input-active").disabled = true

    if (food.is_there_activeness_types == false) document.getElementById("food-info-input-active").hidden = true

    if (pet.pet_weight == null) {
        //document.getElementById("food-info-count").disabled = true
        alert("У вас не введена масса питомца!")
    }
    if (food.is_there_activeness_types == true && pet.pet_activeness_type == null) alert("У вас не введена активность!")
}

//кнопка автоматического рассчета при добавлении корма
function CheckFood(){
    if (document.getElementById("active-checkbox").checked == true) {
        document.getElementById("food-info-input-weight").disabled = true
        document.getElementById("food-info-input-active").disabled = true
    }
    else if (document.getElementById("active-checkbox").checked == false){
        document.getElementById("food-info-input-weight").disabled = false
        document.getElementById("food-info-input-active").disabled = false
    } 
}

function ShowDiet(ration, portion, food){
    //Название рациона
    document.getElementById("diet-info-title").textContent = ration.ration_name;
    
    //Заполнение карточки Корм
    document.getElementById("diet-info-name").textContent = food.food_name;
    document.getElementById("diet-info-brand").textContent = food.food_brand;
    document.getElementById("diet-info-type").textContent = "Тип корма:\u00A0" + food.food_type;
    document.getElementById("diet-info-breed").textContent = "Порода питомца:\u00A0" + food.food_pet_species_name;

    //Добавление зеленой иконки
    if (food.food_is_sterilize == true) {
        let divFlag = document.createElement("div")
        divFlag.class = "diet-info-food-flag"
        let imgFlag = document.createElement("img")
        imgFlag.src = "../resource/special-food.svg"
        divFlag.appendChild(imgFlag)
        document.getElementById("diet-info-flag").appendChild(divFlag)
    }
    
    //Заполнение карточки Параметры
    document.getElementById("diet-info-pet-weight").textContent = "Вес питомца:\u00A0" + ration.ration_pet_weight + "\u00A0кг"

    let imgAct
    switch (ration.ration_activeness_type){
        case 0:
            imgAct = "";
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

    document.getElementById("diet-info-pet-act").src = imgAct;
    
    //Заполнение карточки Суточная порция
    document.getElementById("diet-info-dose").textContent = ration.ration_total_size + "\u00A0г";
    
    //Отрисовка порций
    showListOfPortions(portion, 
        //эвент для редакта
        (event) => {
        let button = event.currentTarget;
        let id = button.id.split('_')[1];
        //снятие дисаблед
        document.getElementById("time_" + id).disabled = false
        document.getElementById("value_" + id).disabled = false
        document.getElementById("check_" + id).disabled = false
        //возможность редактирования
        document.getElementById("time_" + id).isActive = true
        document.getElementById("value_" + id).isActive = true
        document.getElementById("check_" + id).isActive = true
        //смена картинки на сохранение
        document.getElementById("imgEdit_" + id).src = "../resource/table-save.svg";
        document.getElementById("imgEdit_" + id).id = "imgSave_" + id
        document.getElementById("edit_" + id).id = "save_" + id
        document.getElementById("hide").value = document.getElementById("hide").value + "_" + id
        document.getElementById("save_" + id).onclick = ChangePortion;
        },
        //эвент для удаления
        (event) => {
            let button = event.currentTarget;
            let id = button.value;
            DeletePortion(id);
            },
            //эвент для checkbox
            (event) => {
                let button = event.currentTarget;
                let id = button.id.split('_')[1];
                let portion = {
                    portion_id : id,
                    portion_is_feed : document.getElementById("check_" + id).checked
                }; 
                let answer = createRequest("/pet/ration/portion/feed", portion)
                answer = JSON.parse(answer)

                if (answer.status == 200)
                {
                    alert("Кормление успешно отмечено :)");
                    document.getElementById("check_" + id).disabled = true
                    //window.location.href = "/MobileSite/html/Diet.html?pet_id=" + url.searchParams.get("pet_id");
                }
                else
                {
                    alert("Что-то пошло не так :(");
                }
                });
}

//Добавить порцию
function NewPortion(){
    let portion = {
        diet_id : document.getElementById("diet-info-header").value,
        portion_size: document.getElementById("add-dose").value,
        portion_time: document.getElementById("add-time").value
    }; 

    let answer = createRequest("/pet/ration/portion/add", portion) // Отправка Саше логина и пароля
    answer = JSON.parse(answer)


    //если все верно, то придет user_id, если нет, то должно прийти, что неверный логин или пароль
    //есть ли питомцы
    if (answer.status == 200)
    {
        alert("Новая порция успешно добавлена :)");
        window.location.href = "/MobileSite/html/Diet.html?pet_id=" + url.searchParams.get("pet_id");
    }
    else
    {
        alert("Что-то пошло не так :(");
    }
}

//Удалить порцию
function DeletePortion(portion_id){
    let portion = {
        portion_id : portion_id
    }; 

    let answer = createRequest("/pet/ration/portion/delete", portion) // Отправка Саше логина и пароля
    answer = JSON.parse(answer)


    //если все верно, то придет user_id, если нет, то должно прийти, что неверный логин или пароль
    //есть ли питомцы
    if (answer.status == 200)
    {
        alert("Порция успешно удалена :)");
        window.location.href = "/MobileSite/html/Diet.html?pet_id=" + url.searchParams.get("pet_id");
    }
    else
    {
        alert("Что-то пошло не так :(");
    }
}

//Удалить рацион
function DeleteRation(){

    let id = document.getElementById("diet-info-header").value

    let diet = {
        diet_id : id
    }; 

    let answer = createRequest("/pet/ration/delete", diet) 
    answer = JSON.parse(answer)

    if (answer.status == 200)
    {
        alert("Порция успешно удалена :)");
        window.location.href = "/MobileSite/html/Diet.html?pet_id=" + url.searchParams.get("pet_id");
    }
    else
    {
        alert("Что-то пошло не так :(");
    }
}

//Изменить порцию
function ChangePortion(){
    let value = document.getElementById("hide").value 
    let diet_id = value.split('_')[0];
    let portion_id = value.split('_')[1];
    let portion = {
        diet_id : diet_id,
        portion_id : portion_id,
        portion_size : document.getElementById("value_" + portion_id).value,
        portion_time : document.getElementById("time_" + portion_id).value
    }; 

    let answer = createRequest("/pet/ration/portion/change", portion) // Отправка Саше логина и пароля
    answer = JSON.parse(answer)

    let portion1 = {
        portion_id : portion_id,
        portion_is_feed : document.getElementById("check_" + portion_id).checked
    }; 

    let answer1 = createRequest("/pet/ration/portion/feed", portion1)
    answer1 = JSON.parse(answer1)

    //смена картинки на изменение
    document.getElementById("imgSave_" + portion_id).src = "../resource/edit.svg";
    document.getElementById("imgSave_" + portion_id).id = "imgEdit_" + portion_id
    document.getElementById("save_" + portion_id).id = "edit_" + portion_id

    if (answer.status == 200)
    {
        alert("Порция успешно изменена :)");
        //window.location.href = "/MobileSite/html/Diet.html?pet_id=" + url.searchParams.get("pet_id");
    }
    else
    {
        alert("Что-то пошло не так :(");
    }
}

//активность редакт/сохр
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

function exitExit(){
    window.location.href = "/index.html"
}

/*function settings(){
    window.location.replace = "/MobileSite/html/Settings.html?user_id=" + url.searchParams.get("user_id")
}

function settingsPD(){
    window.location.href = "/MobileSite/html/PersonalData.html?user_id=" + url.searchParams.get("user_id")
}*/

function manData(data){
    document.getElementById("pd_lastname").value = data.last_name
    document.getElementById("pd_firstname").value = data.first_name
    document.getElementById("pd_pathr").value = data.patronymic
    document.getElementById("pd_nickname").value = data.nickname
    document.getElementById("pd_mail").value = data.e_mail
    document.getElementById("pd_phone").value = data.phone
}

function changeManData(){
    let user =
    {
        user_id : url.searchParams.get("user_id"),
        last_name : document.getElementById("pd_lastname").value,
        first_name : document.getElementById("pd_firstname").value,
        patronymic : document.getElementById("pd_pathr").value,
        nickname : document.getElementById("pd_nickname").value,
        e_mail : document.getElementById("pd_mail").value,
        phone : document.getElementById("pd_phone").value
    }

    let answer = createRequest("/user/change/personal_data", user)
    answer = JSON.parse(answer)

    if (answer.status == 200)
    {
        alert("Данные успешно изменены :)");
        window.location.href = "/MobileSite/html/PersonalData.html?user_id=" + url.searchParams.get("user_id")
    }
    else
    {
        alert("Что-то пошло не так :(");
    }
}