var shareButton = document.getElementById('pet-share');

shareButton.addEventListener('click', function() {

    // Проверка поддержки navigator.share
    if (navigator.share) {
        // navigator.share принимает объект с URL, title или text
        navigator.share({
                title: "Мой питомец",
                text: "Мой питомец лучше твоего!",
                url: window.location.href
            })
            .then(function () {
                console.log("Shareing successfull")
            })
            .catch(function () {
                console.log("Sharing failed")
            })

    } else {
        console.log("Sorry! Your browser does not support Web Share API")
    }
})