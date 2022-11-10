window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    document.querySelector(".header").style.transition = "0.2s";
      document.querySelector(".header > .header-content > .title").style.transition = "0.2s";
    document.querySelector(".back").style.transition = "0.2s";
    document.querySelector(".header").style.paddingTop = "30px";
    document.querySelector(".header").style.paddingBottom = "10px";
    document.querySelector(".header > .header-content > .title").style.fontSize = "50px";
    document.querySelector(".back").style.height = "50px";  
  } else {
    document.querySelector(".header").style.paddingTop = "60px";
    document.querySelector(".header").style.paddingBottom = "30px";
    document.querySelector(".back").style.height = "70px";  
    document.querySelector(".header > .header-content > .title").style.fontSize = "60px";
  }
}