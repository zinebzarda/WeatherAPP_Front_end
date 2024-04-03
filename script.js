const APIKey = '505eea31e63a0c9c87201ced6a4c824d';

async function fetchWeather(city) {
   const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric&lang=fr`;
   const res = await fetch(APIUrl);

   const data = await res.json();
   const image = document.querySelector('.weather-box img');
   const temperature = document.querySelector('.weather-box .temperature');
   const description = document.querySelector('.weather-box .description');
   const humidity = document.querySelector('.weather-details .humidity span');
   const wind = document.querySelector('.weather-details .wind span');
   const bg = document.querySelector('body');
   const namCity = document.querySelector('.nameCity');
   // console.log(data);
   switch (data.weather[0].main) {
      case 'Clear':
         image.src = 'images/clear.png';
         bg.style.background = 'url("images/bg-sun.jpg") top right/cover no-repeat';
         break;
      case 'Rain':
         image.src = 'images/rain.png';
         bg.style.background = 'url("images/bg-rain.jpg") top right/cover no-repeat ';
         break;
      case 'Snow':
         image.src = 'images/snow.png';
         bg.style.background = 'url("images/bg-snow.jpg") top right/cover no-repeat';
         break;
      case 'Clouds':
         image.src = 'images/cloud.png';
         bg.style.background = 'url("images/bg-cloud.jpg") top right/cover no-repeat ';
         break;
      case 'Mist':
      case 'Haze':
         image.src = 'images/mist.png';
         bg.style.background = 'url("images/bg-mist.jpg") top right/cover no-repeat';
         break;
   }

   temperature.innerHTML = `${parseInt(data.main.temp)} <span>°C</span>`;
   description.innerHTML = `${data.weather[0].description}`;
   humidity.innerHTML = `${parseInt(data.main.humidity)}%`;
   wind.innerHTML = `${parseInt(data.wind.speed)} Km/h`;
   namCity.innerHTML = `${data.name}`;
}

fetchWeather('Beni Mellal');
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
search.addEventListener('click', async () => {
   const city = document.querySelector('.search-box input').value;
   try {
      if (city !== '') {
          await fetchWeather(city);
      } 
  } catch (error) {
      console.error(error.message);
      alert('City not found');
  }
  
});
