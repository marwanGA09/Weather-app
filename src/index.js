import './tailwind.css';
import cloud from './img/cloud.jpg';
import humidity from './img/humidity.webp';
import wind from './img/wind.png';
import bg from './img/roadandrain.jpeg';
const weatherApiKey = 'afbc932eb78247838c451817240703';
const container = document.querySelector('.my-container');
container.setAttribute(
  'style',
  ` background-image: linear-gradient(
              rgba(73, 220, 73, 0.369),
              rgba(241, 71, 71, 0.39)
            ),
            url(${bg});`
);

async function getWeatherFromApi(location) {
  const weather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}`
  );
  if (!weather.ok) {
    throw new Error(`Error fetching weather data: ${weather.statusText}`);
  }
  return await weather.json();
}

function renderPage(place) {
  let weather = getWeatherFromApi(place);
  weather
    .then((data) => {
      if (data.error) {
        throw new Error(`${data.error.message}`);
      } else {
        console.log(data);
        document
          .querySelector('.location')
          .insertAdjacentHTML(
            'afterbegin',
            createLocationContent(
              data.location,
              data.forecast.forecastday[0].astro
            )
          );

        document
          .querySelector('.weather')
          .insertAdjacentHTML(
            'afterbegin',
            createWeatherContent(data.current, data.forecast.forecastday[0].day)
          );
      }
      addFlag(data.location.country);
      console.log(data.location.country);
    })
    .catch((error) => {
      const errorSpan = document.querySelector('#label');
      errorSpan.insertAdjacentHTML(
        'afterend',
        `<span class="error absolute top-12 text-red-700">${error.message} ${place}</span>`
      );
    })
    .finally(() => {
      const search = document.querySelector('#search');
      search.value = '';
    });
}

renderPage('addis abeba');
function removeChild() {
  const location = document.querySelectorAll('.location p');
  location.forEach((p) => p.remove());
  const weather = document.querySelectorAll('.weather div');
  weather.forEach((div) => div.remove());
  const error = document.querySelector('.error');
  if (error != null) {
    error.innerHTML = '';
  }
}

function addFlag(country) {
  const flag = fetchTest(country);
  flag.then((flag) => {
    console.log(flag[0].flags.png);
    document.querySelector('.flag').src = flag[0].flags.png
      ? flag[0].flags.png
      : '';
  });
}

function createLocationContent(location, forecast) {
  return `
              <p class="country text-2xl">
              <span class="border-b-2 border-green-300">${location.name}</span>, ${location.country}
            </p>
            <p class="time text-xl text-gray-950">${location.localtime}</p>
            <p class="sun-rise text-xl text-gray-950">Sun rise at: ${forecast.sunrise}</p>
             <p class="sun-set text-xl text-gray-950">Sun set at: ${forecast.sunset}</p>`;
}

function createWeatherContent(current, forecast) {
  console.log(forecast);
  return `<div
              class="condition md:flex md:justify-between md:items-center lg:col-span-3"
            >
              <span class="text">Weather condition: ${forecast.condition.text}</span>
              <div class="icon md:w-11 md:h-10">
                <img id="icon" src="${forecast.condition.icon}" alt="" />
              </div>
            </div>
            <div class="flex justify-between md:items-center temp">Max-Temperature: ${forecast.maxtemp_c} °C</div>
            <div class="flex justify-between md:items-center temp">Min-Temperature: ${forecast.mintemp_c} °C</div>
            <div class="flex justify-between md:items-center rain-chance">Chance of rain: ${forecast.daily_chance_of_rain}%</div>
            <div class="flex justify-between md:items-center wind">
              <p>Wind speed: ${current.wind_kph}kmh to ${current.wind_dir}</p>
              <img
                class="w-6 h-6 md:w-11 md:h-10"
                src="${wind}"
                alt=""
              />
            </div>
            <div class="flex justify-between md:items-center humidity">
              <p>Humidity: ${current.humidity}</p>
              <img
                src="${humidity}"
                alt=""
                class="w-6 h-6 md:w-11 md:h-10"
              />
            </div>
            <div class="flex justify-between md:items-center cloud">
              <p>Cloud coverage: ${current.cloud}%</p>
              <img
                src="${cloud}"
                alt=""
                class="w-6 h-6 md:w-11 md:h-10"
              />
            </div>`;
}

const search = document.querySelector('#search');
search.addEventListener('keydown', (event) => {
  // console.log(event.key);
  if (event.key === 'Enter') {
    removeChild();
    renderPage(search.value);
  }
});

async function fetchTest(country) {
  const flag = await fetch(`https://restcountries.com/v3.1/name/${country}`);

  return await flag.json();
}
