const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

let lat =null;
let lon =null;



// const city = [
//    { name: "New York", lat: 40.7128, long: -74.006 },
//    { name: "Los Angeles", lat: 34.0522, long: -118.2437 },
//    { name: "Chicago", lat: 41.8781, long: -87.6298 },
//    { name: "Houston", lat: 29.7604, long: -95.3698 },
//    { name: "Phoenix", lat: 33.4484, long: -112.074 },
//    { name: "Philadelphia", lat: 39.9526, long: -75.1652 },
//    { name: "San Antonio", lat: 29.4241, long: -98.4936 },
//    { name: "San Diego", lat: 32.7157, long: -117.1611 },
//    { name: "Dallas", lat: 32.7767, long: -96.797 },
//    { name: "San Jose", lat: 37.3382, long: -121.8863 },
//    { name: "Austin", lat: 30.2672, long: -97.7431 },
//    { name: "Jacksonville", lat: 30.3322, long: -81.6557 },
//    { name: "San Francisco", lat: 37.7749, long: -122.4194 },
//    { name: "Indianapolis", lat: 39.7684, long: -86.1581 },
//    { name: "Columbus", lat: 39.9612, long: -82.9988 },
//    { name: "Fort Worth", lat: 32.7555, long: -97.3308 },
//    { name: "Charlotte", lat: 35.2271, long: -80.8431 },
//    { name: "Seattle", lat: 47.6062, long: -122.3321 },
//    { name: "Denver", lat: 39.7392, long: -104.9903 },
//    { name: "Washington", lat: 38.9072, long: -77.0369 }
//  ];

// const APIKey = '505eea31e63a0c9c87201ced6a4c824d';
// const urlCity =`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`;

// fetch(urlCity).then(res => {
//    return res.json();
// }).then(city =>{
//    lat = city[0].lat;
//    lon = city[0].lon;
//    const APIUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;
// fetch(APIUrl).then(res =>{
//    return res.json();
// }).then(data => {
//    console.log(data);
// })
// })




//   city.forEach(async city => {
//       const { name, lat, long } = city;
//       const data = await fetchData(lat, long);
//       console.log(`Data for ${name}:`, data);
//     });



search.addEventListener('click', () => {
   const APIKey = '505eea31e63a0c9c87201ced6a4c824d';
   const city = document.querySelector('.search-box input').value;
   const urlCity = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`;

   if (city == '') return;

   fetch(urlCity)
      .then(res => res.json())
      .then(cityData => {

        
         const firstCity = cityData[0];
         lat = firstCity.lat;
         lon = firstCity.lon;

         const APIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric&lang=fr`;

         return fetch(APIUrl);
      })
      .then(res => res.json())
      .then(data => {
       
         if(data.cod == 404){
           error404.classList.add('active')
            
         }

         const image = document.querySelector('.weather-box img');
         const temperature = document.querySelector('.weather-box .temperature');
         const description = document.querySelector('.weather-box .description');
         const humidity = document.querySelector('.weather-details .humidity span');
         const wind = document.querySelector('.weather-details .wind span');
         const bg = document.querySelector('body');
         console.log(data);
         switch (data.weather[0].main) {
            case 'Clear':
               image.src = 'images/clear.png';
               bg.style.background = 'url("images/bg-sun.jpg")';
               break;
            case 'Rain':
               image.src = 'images/rain.png';
               bg.style.background = 'url("images/bg-rain.jpg") ';
               break;
            case 'Snow':
               image.src = 'images/snow.png';
               bg.style.background = 'url("images/bg-snow.jpg") ';
               break;
            case 'Clouds':
               image.src = 'images/cloud.png';
               bg.style.background = 'url("images/bg-cloud.jpg") ';
               break;
            case 'Mist':
            case 'Haze':
               image.src = 'images/mist.png';
               bg.style.background = 'url("images/bg-mist.jpg") ';
               break;
            default:
               image.src = 'images/cloud.png';
               bg.style.background = 'none';
         }

         temperature.innerHTML = `${parseInt(data.main.temp)} <span>°C</span>`;
         description.innerHTML = `${data.weather[0].description}`;
         humidity.innerHTML = `${parseInt(data.main.humidity)}%`;
         wind.innerHTML = `${parseInt(data.wind.speed)} Km/h`;
      })
      
});
