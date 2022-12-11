// xhr.open(method, URL, [async, user, password]);

// Этот метод обычно вызывается сразу после new XMLHttpRequest. В него передаются основные параметры запроса:

// method – HTTP-метод. Обычно это "GET" или "POST".
// URL – URL, куда отправляется запрос: строка, может быть и объект URL.
// async – если указать false, тогда запрос будет выполнен синхронно, это мы рассмотрим чуть позже.
// user, password – логин и пароль для базовой HTTP-авторизации (если требуется).

//var XMLHttpRequest = require('xhr2');

// функция, расшифровывающая ответ на запрос поданного url
function Request(url, answer) {
  //console.log(answer);
  answer = JSON.parse(answer);

  switch(url) {
    case '/user':
      //console.log(answer);
      console.log("статус = " + answer.status);
      console.log("сообщение = " + answer.message);
      console.log("время запроса = " + answer.time);
      console.log("фамилия = " + answer.object.user.last_name);
      console.log("имя = " + answer.object.user.first_name);
      console.log("отчество = " + answer.object.user.patronymic);
      console.log("никнейм = " + answer.object.user.nickname);
      console.log("пароль = " + answer.object.user.password);
      console.log("почта = " + answer.object.user.e_mail);
      console.log("телефон = " + answer.object.user.phone);
      console.log("адрес = " + answer.object.user.address_id);
      
      /*if (answer.if_pet_exist == "true"){
        url = "/pets_list";
        console.log("IN IF");
        let xhr1 = new XMLHttpRequest();
        prepareRequest(url);
        chooseRequest(xhr1, method, url, json, get_param);
      }*/

      break;

    case '/pet':
      //console.log(answer);
      console.log("статус = " + answer.status);
      console.log("сообщение = " + answer.message);
      console.log("время запроса = " + answer.time);
      console.log("user_id = " + answer.object.user_id);
      console.log("pet_id = " + pet_id);
      console.log("имя питомца = " + answer.object.pet_name);
      if (answer.object.pet_gender === 1)
          console.log("пол питомца = мужской");
        else
          console.log("пол питомца = женский");
      console.log("порода питомца = " + answer.object.breed_id);
      console.log("дата рождения питомца = " + answer.object.pet_date_of_birth);
      console.log("возраст питомца = " + answer.object.pet_age);
      console.log("вес питомца = " + answer.object.pet_weight);
      console.log("фото питомца = " + answer.object.photos);
      console.log("документы питомца = " + answer.object.documents);
      break;

    case '/pets_list':
      for(let i = 0; i < answer.object.length; i++){
        if (answer.object[i].pet_gender === 1)
          console.log("пол питомца = мужской");
        else
          console.log("пол питомца = женский");
        console.log("порода = " + answer.object[i].breed_id);
        console.log("возраст питомца = " + answer.object[i].pet_age);
        console.log("фото = " + answer.object[i].photo);
      }

      break;

    case '/autho':
      //console.log(answer);
      console.log("статус = " + answer.status);
      console.log("сообщение = " + answer.message);
      console.log("время запроса = " + answer.time);
      console.log("user_id = " + answer.object.user_id);
      break;

    case '/registr':
      break;
    
    case 'advice/list':
      break;

    default:
      console.log("Def");
      console.log("url = " + url);
      console.log(answer);
      break;
  }
}

let urlOrigin = new URL(document.URL).origin;
// функция, отправляющая запрос на поданный url
function chooseRequest(xhr, method, url, json_body, get_param, form_type) {
  xhr.open(method, urlOrigin + url + get_param, false); //Белый сервак:194.87.95.63 Сашин:26.109.231.110
  if(form_type != null) xhr.setRequestHeader('Content-type', form_type);
   xhr.send(json_body); //отправка тела запроса
  //console.log("3")

  //console.log("2")
  xhr.onload = function() {
    if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
      //console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
    } else { // если всё прошло гладко, выводим результат
      //console.log(`Готово, получили ${xhr.response}`);
      Request(url, xhr.response);
    //console.log("1")
    }
  };
  
   xhr.onerror = function() {
    console.log("Запрос не удался");
  };



  return xhr.response;
}

let json = null;
let user_id = 1; // Саша = , Ира = 1
//let pet_id = 2; // Попугай = 1, собака = 2 
let us_log = "ikutuzova@gmail.com"; //"Dribla.com" //"ikutuzova@gmail.com"
let us_pass = "Ira"; //"1234" //"Ira" 

//let url = "/breeds_list";
let get_param = "";
let pet_exist = false;

function prepareRequest(url, object){

    let preparingRequest =
    {
        method: "",
        get_param: "",
        json: "",
        form_type: "application/json; charset=utf-8"
    }

    // свитч, подготавливающий данные на запрос определенного url
  
  switch(url) {
    case '/breed/help':
      // запрос-хелпер какие параметры мы подаем на вход
      //url = url + '/help';
      preparingRequest.method = "GET";
      break;

    case '/user':
      preparingRequest.get_param = "?user_id=" + object.user_id;
      preparingRequest.method = "GET";
      break;

    case '/pets_list':
      preparingRequest.get_param = "?user_id=" + object.user_id;
      preparingRequest.method = "GET";
      break;

    case '/autho':
      preparingRequest.json = JSON.stringify({
        login: object.mail,
        password: object.password
      });
      preparingRequest.method = "POST";
      break;

    case '/registr':
      preparingRequest.json = JSON.stringify({
        last_name : object.last_name,
        first_name : object.first_name,
        patronymic : object.patronymic,
        nickname : object.nickname,
        e_mail : object.mail,
        phone : object.phone,
        password : object.password,
        address_id : "" // адрес_id из другой таблицы
      });
      preparingRequest.method = "POST";
    /*
    согласие обрабатывается у нас
          (отправка только true, при false кнопка отправки неактивна)*/
      break;

    case '/pet':
      preparingRequest.get_param = "?pet_id=" + object.pet_id;
      preparingRequest.method = "GET";
      break;

    case '/add_pet':
      var formData = new FormData();
      let js = JSON.stringify({
        user_id : object.user_id,
        pet_name : object.name, //строка
        pet_gender : object.gender, //число - 1 (м), 2 (ж)
        breed_id : object.breed_id, //число - id породы breed_id
        pet_date_of_birth : object.date_of_birth, //date
        pet_weight : object.weight, //число
        pet_activeness_type : object.active,
        /*photos : object.photo, //фото
        documents : object.documents //документы*/
        });


      const blobJS = new Blob([js], {
        type: 'application/json'
      });

      formData.append("pet", blobJS);
      formData.append("photo", object.photo);
      //formData.append("document", "");

      preparingRequest.json = formData;
      preparingRequest.form_type = null;
      preparingRequest.method = "POST";
      break;

    case '/pet/change':
      var formData = new FormData();
      let js1 = JSON.stringify({
        pet_id : object.pet_id,
        pet_name : object.name, //строка
        pet_gender : object.gender, //число - 1 (м), 2 (ж)
        breed_id : object.breed_id, //число - id породы breed_id
        pet_date_of_birth : object.date_of_birth, //date
        pet_weight : object.weight, //число
        pet_activeness_type : object.active
        /*photos : object.photo, //фото
        documents : object.documents //документы*/
        });

      const blobJS1 = new Blob([js1], {
        type: 'application/json'
      });

      formData.append("pet", blobJS1);
      formData.append("photo", object.photo);
      //formData.append("document", "");

      preparingRequest.json = formData;
      preparingRequest.form_type = null;
      preparingRequest.method = "POST";
      break;

    case '/pet/access_user/delete':
      preparingRequest.json = JSON.stringify({
        pet_id : object.pet_id,
        user_nickname : object.nickname
      });
      preparingRequest.method = "DELETE";
      break;

    case '/pet/access_user/add':
      preparingRequest.json = JSON.stringify({
        user_nickname: object.nickname,
        pet_id : object.pet_id
      });
      preparingRequest.method = "POST";
      break;

    case '/pet/access_user/list':
      preparingRequest.get_param = "?pet_id=" + object.pet_id;
      preparingRequest.method = "GET";
      break;

    case '/pet/main_user':
      preparingRequest.get_param = "?pet_id=" + object.pet_id;
      preparingRequest.method = "GET";
      break;

    case '/breeds_list':
      preparingRequest.method = "GET";
      break;

    case '/pet/ration/list':
      preparingRequest.get_param = "?pet_id=" + object.pet_id;
      preparingRequest.method = "GET";
      break;
    
    case '/pet/ration':
      preparingRequest.get_param = "?ration_id=" + object.ration_id;
      preparingRequest.method = "GET";
      break;

    case '/pet/ration/portion/list':
      preparingRequest.get_param = "?ration_id=" + object.ration_id;
      preparingRequest.method = "GET";
      break;

    case '/pet/ration/food':
      preparingRequest.get_param = "?ration_id=" + object.ration_id;
      preparingRequest.method = "GET";
      break;

    case '/pet/ration/portion/add':
      preparingRequest.json = JSON.stringify({
        diet_id : object.diet_id,
        portion_size: object.portion_size,
        portion_time: object.portion_time
      });
      preparingRequest.method = "POST";
      break;

    case '/pet/ration/portion/feed':
      preparingRequest.json = JSON.stringify({
        portion_id : object.portion_id,
        portion_is_feed : object.portion_is_feed
      });
      preparingRequest.method = "POST";
      break;

    case '/pet/ration/portion/change':
      preparingRequest.json = JSON.stringify({
        diet_id : object.diet_id,
        portion_id : object.portion_id,
        portion_size : object.portion_size,
        portion_time : object.portion_time
      });
      preparingRequest.method = "POST";
      break;

    case '/pet/ration/portion/delete':
      preparingRequest.json = JSON.stringify({
        portion_id : object.portion_id
      });
      preparingRequest.method = "DELETE";
      break;

    case '/pet/ration/delete':
      preparingRequest.json = JSON.stringify({
        diet_id : object.diet_id
      });
      preparingRequest.method = "DELETE";
      break;

    case '/food_list':
      preparingRequest.method = "GET";
      break;

    case '/food':
      preparingRequest.get_param = "?food_id=" + object.food_id;
      preparingRequest.method = "GET";
      break;

    case '/pet/ration/calculate':
      preparingRequest.json = JSON.stringify({
        ration_food_id: object.input_id,
        ration_pet_weight: object.input_weight,
        ration_activeness_type : object.input_active
      });
      preparingRequest.method = "POST";
      break;

    case '/pet/ration/add':
      preparingRequest.json = JSON.stringify({
        ration_food_id: object.input_id,
        ration_name : object.input_name,
        pet_id : object.input_pet_id,
        ration_pet_weight: object.input_weight,
        ration_activeness_type : object.input_active,
        ration_total_size : object.input_calc,
        ration_auto_calc : object.input_auto
      });
      preparingRequest.method = "POST";
      break;
    
    case '/advice/list':
      preparingRequest.method = "GET";
      break;

    case '/day_advice':
      preparingRequest.method = "GET";
      break;

    case '/user/change/personal_data':
      preparingRequest.json = JSON.stringify({
        user_id : object.user_id,
        last_name : object.last_name,
        first_name : object.first_name,
        patronymic : object.patronymic,
        nickname : object.nickname,
        e_mail : object.e_mail,
        phone : object.phone
      });
      preparingRequest.method = "POST";
      break;
     
    default:
      break;

  }

  return preparingRequest

}

export function createRequest(url, object)
{
    let xhr = new XMLHttpRequest(); // у конструктора нет аргументов
    let request = prepareRequest(url, object);
    let answer = chooseRequest(xhr, request.method, url, request.json, request.get_param, request.form_type);
    return answer;
}



/*for(let ii = 0; ii < 1; ii++){
  prepareRequest(url1[ii]);
  chooseRequest(method, url1[ii], json, get_param);
}*/

//chooseRequest(method, url, json, get_param);

/*
switch(m) {
  case 'add_pet':
    json = JSON.stringify({
      pet_name : "", //строка
      pet_gender : "", //число - 0 (м), 1 (ж)
      Порода_id : "", //число - id породы breed_id
      pet_date_of_birth : "", //date
      pet_weight : "", //число
      photo : "", //фото
      documents : "" //документы
    });
    method = "POST";
    url = "/add_pet";
    break;

  

  case 'feed':
    json = JSON.stringify({
      название_корма : ""
    });
    method = "GET";
    url = "/feed";
    break;

  case 'care_tips':
    json = JSON.stringify({
      совет_id : ""
    });
    method = "GET";
    url = "/care_tips";
        break;

  default:
    break;
}
*/
