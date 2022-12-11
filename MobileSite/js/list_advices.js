/*let UserId = 1;
let AdviceId = 1;
let AdvicePhoto = "../resource/pet4.jpg";
let AdviceTitle = "Что такое попугай?";
let AdviceText = "Попугаи бывают разные";*/

export function writeOnHtmlPageAdvicesList(AdviceId, AdvicePhoto, AdviceTitle, AdviceText){
    let divListCard = document.createElement("div")
    let aLink = document.createElement("a")
    let divCard = document.createElement("div")
    let imgImage = document.createElement("img")
    let divText = document.createElement("div")
    let divTitle = document.createElement("div")
    let divDesc = document.createElement("div")

    divListCard.className = "list-card"
    //aLink in divListCard
    aLink.className = "advice-card-link"
    aLink.href = "#" //ссылка на полный совет
    //divCard in aLink
    divCard.className = "card"
    //imgImage and divText in divCard
    imgImage.className = "card-image"
    if(AdvicePhoto == "" || AdvicePhoto == null)
     {
     imgImage.src = "/MobileSite/resource/img.png"
     }
    else {
        imgImage.src = `data:image/*;base64,${AdvicePhoto}`
    }
    divText.className = "advice-card-text"
    //divTitle and divDesc in devText
    divTitle.className = "card-title" //Заголовок совета
    divTitle.textContent = AdviceTitle
    divDesc.className = "advice-card-description" //Описание совета
    divDesc.textContent = AdviceText

    //compose 
    //divText compose
    divText.appendChild(divTitle)
    divText.appendChild(divDesc)
    //divCard compose
    divCard.appendChild(imgImage)
    divCard.appendChild(divText)
    //aLink compose
    aLink.appendChild(divCard)
    //divListCard compose
    divListCard.appendChild(aLink)
    //search and add in list-of-advices
    document.getElementById("list-of-advices").appendChild(divListCard)
}


export function showListOfAdvices(advices_list)
{
    let count_of_advices = advices_list.length;

    for(let i = 0; i < count_of_advices; i++){
        writeOnHtmlPageAdvicesList(advices_list[i].advice_id, advices_list[i].picture, advices_list[i].advice_name, advices_list[i].advice_description, i);
    }
}