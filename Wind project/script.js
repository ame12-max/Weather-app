const apiKey = '9fae327a6cfc622578fe990727d7a686';

const apiLnk = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const wetherIcon = document.querySelector('.wether-icon');


const slidingText = document.querySelector('.sliding-text');
let slideInterval;

function slideText() {
    slidingText.style.transition = "transform 1s ease-in-out";
    slidingText.style.transform = "translateX(-120%)";

    setTimeout(() => {
        slidingText.style.transition = "transform 1s ease-in-out";
        slidingText.style.transform = "translateX(0)";
    }, 15000);
}

slideInterval = setInterval(slideText, 3000);



async function checkWether(city) {
    const response = await fetch(apiLnk + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".wether").style.display = "none";
        
    }
    else{
        let data = await response.json();
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
        document.querySelector(".wind").innerHTML=data.wind.speed + " km/hr";
    
    if (data.weather[0].main.toLowerCase() === 'clouds'){
        wetherIcon.src = "images/clouds.png";
    }
    else if (data.weather[0].main.toLowerCase() === 'clear'){
        wetherIcon.src = "images/clear.png";
    }
    else if (data.weather[0].main.toLowerCase() === 'rain'){
        wetherIcon.src = "images/rain.png";
    }
    else if (data.weather[0].main.toLowerCase() === 'drizzle'){
        wetherIcon.src = "images/drizzle.png";
    }
    else if (data.weather[0].main.toLowerCase() === 'mist'){
        wetherIcon.src = "images/mist.png";
    }
    document.querySelector(".wether").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }

   
    
}
searchBtn.addEventListener("click",() =>{
    checkWether(searchBox.value);
})
